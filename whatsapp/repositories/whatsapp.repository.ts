import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWhatsappDto } from '../dto/create-whatsapp.dto';
import { UpdateWhatsappDto } from '../dto/update-whatsapp.dto';
import { WhatsappEntity } from '../entities/whatsapp.entity';
import axios from 'axios';
import { Prisma } from '@prisma/client';

@Injectable()
export class WhatsappRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createWhatsappDto: CreateWhatsappDto,
    currentUser: string,
  ): Promise<WhatsappEntity> {
    try {
      return await this.prisma.whatsapp.create({
        data: {
          idempresa: createWhatsappDto.idempresa,
          endpoint: createWhatsappDto.endpoint,
          session: createWhatsappDto.session,
          sessionkey: createWhatsappDto.sessionkey,
          token: createWhatsappDto.token,
          numero: createWhatsappDto.numero,
          created_at: new Date(),
          created_by: currentUser,
          updated_at: new Date(),
          updated_by: currentUser,
        },
      });
    } catch (error) {
      throw new Error(`Erro ao criar mensagem: ${error.message}`);
    }
  }

  async findAll(currentUser) {
    try {
      const { id, idempresa, perfil } = currentUser;
      if (perfil.nome === 'Admin') {
        return await this.prisma.whatsapp.findMany({
          select: {
            idwhatsapp: true,
            idempresa: true,
            numero: true,
            session: true,
            sessionkey: true,
            token: true,
            endpoint:true,
          },
        });
      
      }else if (perfil.nome === 'Empresa' || perfil.nome === 'Lojista') {
        const query =`select distinct * from whatsapp where idempresa in(${idempresa.toString()})`
        return await this.prisma.$queryRaw(Prisma.raw(query));
        // console.log(produto);
      }
      
    } catch (error) {
      throw new Error(`Erro ao consultar whatsapp: ${error.message}`);  
    }
  }
  async findOne(idwhatsapp: number) {
    return await this.prisma.whatsapp.findUnique({
      select: {
        idwhatsapp: true,
        idempresa: true,
        numero: true,
        session: true,
        sessionkey: true,
        token: true,
        endpoint: true
      },
      where: { idwhatsapp },
    });
  }

  async findAllByCompany(idempresa: number) {
    return await this.prisma.whatsapp.findMany({
      select: {
        idwhatsapp: true,
        idempresa: true,
        numero: true,
        session: true,
        sessionkey: true,
        token: true,
        endpoint:true,
      },
      where: { idempresa: idempresa },
    });
  }

  async update(
    idwhatsapp: number,
    updateWhatsappDto: UpdateWhatsappDto,
    currentUser: string,
  ): Promise<WhatsappEntity> {
    try {
      return await this.prisma.whatsapp.update({
        where: {
          idwhatsapp,
        },
        data: {
          ...updateWhatsappDto,
          updated_at: new Date(),
          updated_by: currentUser,
        },
      });
    } catch (error) {
      throw new Error(`Erro ao atualizar o Whatsapp: ${error.message}`);
    }
  }

  async remove(idwhatsapp: number) {
    try {
      return await this.prisma.whatsapp.delete({
        where: {
          idwhatsapp:idwhatsapp,
        }, 
      });
    } catch (error) {
      throw new Error(`Erro ao remover o produto: ${error.message}`);
    }
  }
  async beginSession(session: string) {
    const body = {
      session,
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        sessionkey: 'ZapTic',
        apitoken: 'ZapTic',
      },
      body: JSON.stringify(body),
    };

    return await fetch('https://teste.uzapi.com.br:3333/start', options);
  }

  async sendText(data: any) {

    try {
      const body = JSON.stringify({
        session: data.session,
        number: `55${data.fone_lead.replace(/[()-]/g, '')}`,
        text: data.texto,
      });

      const config = {
        method: 'post',
        url: `${data.endpoint}/sendText`,
        headers: {
          sessionkey: data.sessionkey,
          'Content-Type': 'application/json',
        },
        data: body,
      };

      const response = await axios(config);

      return response.data
    } catch (error) {
      return error;
    }
  }
}
