import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessageEntity } from './entities/message.entity';
import { MessageRepository } from './repositories/message.repository';
import { WhatsappRepository } from '../whatsapp/repositories/whatsapp.repository';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class MessageService {
  constructor(
    private readonly repository: MessageRepository,
    private readonly whatsappRepository: WhatsappRepository,
  ) {}

  async create(  createMessageDto: CreateMessageDto, currentUser,): Promise<MessageEntity> {
    try {
      const createdMessage = await this.repository.create(
        createMessageDto,
        currentUser,
      );
      return createdMessage;
    } catch (error) {
      throw new Error('Erro ao criar o mensagens. Detalhes: ' + error.message);
    }
  }

  findAll(currentUser) {
    try {
      const messages = this.repository.findAll(currentUser);
      return messages;
    } catch (error) {
      throw new Error('Erro ao listar mensagens: ' + error.message);
    }
  }

  findAllByCompany(company: number) {
    try {
      const messages = this.repository.findAllByCompany(company);
      return messages;
    } catch (error) {
      throw new Error('Erro ao listar mensagens: ' + error.message);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return this.repository.remove(id);
  }

  findMessagesToSend() {
    return this.repository.findMessagesToSend();
  }

  async findMessagesAndLeads(
    idempresa: number,
    idmensagem: number,
    idproduto: number,
    idestado: number,
    idcidade: number,
  ): Promise<any> {
    const mensagens = await this.repository.findMessagesAndLeads(
      idempresa,
      idmensagem,
      idproduto,
      idestado,
      idcidade,
    );
    return mensagens;
  }

  // @Cron('0 * * * * *')
  async sendMessagesLeads() {
    const sended = [];
    const mensages = await this.repository.findMessagesToSend();
    for (const message of mensages as any[]) {
        const currentTime = new Date();
        const sendTime = new Date();
        const dateTime = message.data?sendTime.setHours(message.hora.split(':')[0],message.hora.split(':')[1]) :''
        if (!(dateTime)||(currentTime.getTime() >= sendTime.getTime())) {
          const leads = (await this.repository.findMessagesAndLeads(message.idempresa, message.idmensagem, message.idproduto, message.idestado, message.idcidade)) as Array<object>;
          const result = await Promise.all(
            leads.map((lead) => this.whatsappRepository.sendText(lead)),
          );  
          if (result[0]?.result == 200) {
            this.repository.update(message.idmensagem, { status: 'E' });
          }
          sended.push(result);
        } 
    } 
    return sended.flat();
  }

  async sendMessages(
    idwhatsapp: number,
    fone: string,
    text: string,
  ): Promise<any> {
    try {
      // Encontra a configuração do WhatsApp pelo ID
      const whatsapp = await this.whatsappRepository.findOne(idwhatsapp);

      if (!whatsapp) {
        throw new Error('Configuração do WhatsApp não encontrada.');
      }

      // Prepara os dados para enviar a mensagem
      const messageData = {
        session: whatsapp.session,
        sessionkey: whatsapp.sessionkey,
        fone_lead: fone,
        texto: text,
        endpoint: whatsapp.endpoint,
      };

      // Envie a mensagem usando o método sendText do repositório whatsapp
      const enviomesage = await this.whatsappRepository.sendText(messageData);
      
      if(enviomesage.result >= 200 && enviomesage.result < 300){
        return enviomesage;
      }else{
        throw new Error('Erro eo enviar mensagem, favor contactar o administrador do sistema.');
      }

      return enviomesage
    } catch (error) {
      // Captura e lida com erros
      console.error(
        'Ocorreu um erro ao enviar a mensagem via WhatsApp:',
        error,
      );

      // Retorna uma mensagem de erro ou um objeto com um indicador de erro, conforme apropriado
      return {
        error:
          'Ocorreu um erro ao enviar a mensagem via WhatsApp. Por favor, tente novamente mais tarde.',
      };
    }
  }
}
