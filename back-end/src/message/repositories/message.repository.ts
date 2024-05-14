import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMessageDto } from "../dto/create-message.dto";
import { UpdateMessageDto } from "../dto/update-message.dto";
import { MessageEntity } from "../entities/message.entity";


@Injectable()
export class MessageRepository  {
    constructor(private readonly prisma: PrismaService){}

    async create(createMessageDto:CreateMessageDto, currentUser: string):Promise<MessageEntity>{
        try {
            return await this.prisma.mensagem.create({
                data:{
                    
                    idempresa: createMessageDto.idempresa,
                    idwhatsapp:createMessageDto.idwhatsapp,
                    descricao:createMessageDto.descricao,
                    texto:createMessageDto.texto,
                    data:createMessageDto.data,
                    hora:createMessageDto.hora,
                    idcidade:createMessageDto.idcidade,
                    idestado:createMessageDto.idestado,
                    idproduto:createMessageDto.idproduto,
                    status:'P',
                    created_at: new Date(),
                    created_by: currentUser,
                    lote_mensagem:{
                        createMany:{
                            data:createMessageDto.lotes.map(data=>{
                               return  {
                                    idlote:data.idlote,
                                    created_at: new Date(),
                                    created_by: currentUser,
                                }
                            })
                        }
                    }
                }
            })
        } catch (error) {
            throw new Error(`Erro ao criar mensagem: ${error.message}`);
        }
    }

    async findAll(currentUser) {
      try {    
        const { id, idempresa, perfil } = currentUser;
  
        if (perfil.nome === 'Admin') {
          return await this.prisma.mensagem.findMany({
            select: {idmensagem:true, texto: true, descricao: true, data: true, hora: true, empresa: {}, },
          });
          
        } else if (perfil.nome === 'Lojista') {
          return await this.prisma.$queryRaw`SELECT
                                              m.idmensagem,
                                              m.descricao ,
                                              m.data,
                                              m.hora,
                                              empresa.*
                                            FROM
                                              empresa e
                                            JOIN
                                              mensagem m ON e.idempresa = m.idempresa
                                            JOIN
                                              lojista l ON e.idempresa = l.idempresa
                                            JOIN
                                              User u ON l.idUser = u.id;
                                            WHERE l.iduser = ${id}`;
          // console.log(produto);
  
        } else if (perfil.nome === 'Empresa') {
          return  await this.prisma.$queryRaw`SELECT
                                                  m.idmensagem,
                                                  m.descricao ,
                                                  m.data,
                                                  m.hora,
                                                  empresa.*
                                                FROM
                                                  empresa e
                                                JOIN
                                                  mensagem m ON e.idempresa = m.idempresa
                                                JOIN
                                                  lojista l ON e.idempresa = l.idempresa
                                                JOIN
                                                  User u ON l.idUser = u.id;
                                                WHERE e.id in(${idempresa.toString()})`;
                                                }
      }catch(errr){
          return []
      }
    }

    async findAllByCompany(company) {
        return await this.prisma.mensagem.findMany({
          select: {idmensagem:true, texto: true, descricao: true, data: true, hora: true, empresa: {}, },
          where:{
            idempresa:company
          }
        });
      }

      async remove(idmensagem: number) {
        const deletedMessage = await  this.prisma.$transaction(async (tx) => {
            const leadMessagesToDelete = await tx.lote_mensagem.findMany({
                where: { idmensagem: idmensagem },
              });

            const leadMessages = await tx.lote_mensagem.deleteMany({
                where: { idmensagem: idmensagem },
            })
            const deletedMessage = await tx.mensagem.delete({
                where: { idmensagem: idmensagem },
                select: { idmensagem: true, hora: true, data: true },
              });
            });

        return deletedMessage;
      }

      async findMessagesAndLeads(idempresa:number,  idmensagem: number, idproduto: number, idestado:number, idcidade:number) {
        const query = `
                      SELECT distinct
                          m.descricao, m.texto, m.status, 
                          IFNULL(le.nome,'Adelino neto') as nome , replace(replace(replace(IFNULL(le.telefone,'(81)98729-7443') , '(', ''), ')', ''), '-', '') as fone_lead,
                          w.endpoint, w.session, w.sessionkey, w.token, replace(replace(replace(w.numero, '(', ''), ')', ''), '-', '') as fone_empresa
                      FROM mensagem m 
                      inner join lote_mensagem lm on m.idmensagem = lm.idmensagem
                      inner join lote l on lm.idlote = l.idlote
                      inner join acesso a on l.idlote = a.idlote 
                      inner join ${"`lead`"} le on a.idacesso = le.idacesso
                      inner join whatsapp w on m.idwhatsapp = w.idwhatsapp
                      where 
                      m.idempresa = ${idempresa}
                      ${idmensagem?` AND m.idmensagem = ${idmensagem}`:''}
                      ${idproduto?` AND m.idproduto = ${idproduto}`:''}
                      ${idestado?` AND le.idestado = ${idestado}`:''}
                      ${idcidade?` AND le.idcidade  = ${idcidade}`:''}
        `
        const messages = await  this.prisma.$queryRaw(Prisma.raw(query) )

        return messages;
      }
      async findMessagesToSend() {
        const messages = await this.prisma.mensagem.findMany({
                                      select:{
                                        idmensagem:true,
                                        idempresa:true,
                                        idproduto:true,
                                        idestado:true,
                                        idcidade:true,
                                        descricao:true,
                                        status:true,
                                        data:true,
                                        hora:true
                                      },
                                      where:{
                                      
                                        OR:[
                                            {
                                              data:null,
                                              status:'P',
                                            },
                                            {
                                              data:new Date().toLocaleDateString('pt-br'),
                                              status:'P',
                                            }
                                        ]
                                      }
                                    })

        return messages;
      }

      async update(id:number,updateMessageDto:UpdateMessageDto) {
        return await this.prisma.mensagem.update({
          where:{
            idmensagem:id
          },
          data:{
            ...updateMessageDto
          },
        
        });
      }

}