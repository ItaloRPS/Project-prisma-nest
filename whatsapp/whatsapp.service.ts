import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { throws } from 'assert';
import axios from 'axios';
import { CreateWhatsappDto } from './dto/create-whatsapp.dto';
import { UpdateWhatsappDto } from './dto/update-whatsapp.dto';
import { WhatsappEntity } from './entities/whatsapp.entity';
import { WhatsappRepository } from './repositories/whatsapp.repository';
import * as crypto from 'crypto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WhatsappService {
  constructor(private readonly whatsapp:WhatsappRepository,
     private readonly prisma: PrismaService,
    ){}

  async create(createWhatsappDto: CreateWhatsappDto,currentUser): Promise<WhatsappEntity & any>{

    const text = this.createSessionKey(createWhatsappDto.numero.replace(/\D/g, ""));
    createWhatsappDto.session = text;
    createWhatsappDto.sessionkey = text;
    createWhatsappDto.token = process.env.TOKENUSAP;
    createWhatsappDto.endpoint = process.env.ENDPOINTUZAP;

    try {
        const createdWhats = await this.whatsapp.create(createWhatsappDto, currentUser);
        if (!createdWhats) {
          throw new Error('Failed to create whatsapp');
        }
        
        const start = await this.startSession(createWhatsappDto)
        if(start.result != "success"){
          this.whatsapp.remove(createdWhats.idwhatsapp)
          throw new Error('Failed to start whatsapp');
          }

        await new Promise(resolve => setTimeout(resolve, 5000));
        const qrCode = await this.getQrCode(createWhatsappDto)
        if (!qrCode.success) {
          this.whatsapp.remove(createdWhats.idwhatsapp)
          throw new Error('Failed to qrCode whatsapp');
        }

        return {createdWhats, qrCode:"qrCode.base64"}
      } catch (error) { 
        throw new Error(`Failed to create Whatsapp: ${error}`);
      }

  }

  async findAll(currentUser) { 
    return await this.whatsapp.findAll(currentUser);
  }

  async findAllByCompany(idempresa: number) {
    const whatsapp = await this.whatsapp.findAllByCompany(idempresa);
    if (!whatsapp) {
      throw new NotFoundException(`whatsapp with id ${idempresa} not found`);
    }
    const newWhatspp = await Promise.all(whatsapp.map(async (data) => {
      const state = await this.state(data);
      delete data.endpoint
      delete data.token
      if (state?.data?.status === "CONNECTED") {
        return { ...data, state: "CONNECTED" };
      } else {
        return { ...data, state: "DISCONNECTED" };
      }
    })); 
    return newWhatspp
  }

  async findByCompany(idempresa: number) {
    const whatsapp = await this.whatsapp.findAllByCompany(idempresa);
    if (!whatsapp) {
      throw new NotFoundException(`Lead with id ${idempresa} not found`);
    }
    const newWhatspp = await Promise.all(whatsapp.map(async (data) => {
      const state = await this.state(data);
      delete data.endpoint
      delete data.token
      if (state?.data?.status === "CONNECTED") {
        return { ...data, state: "CONNECTED" };
      } else {
        return { ...data, state: "DISCONNECTED" };
      }
  
    })); 
    return newWhatspp
  }
 
  async findOne(id: number) {
    return await this.whatsapp.findOne(+id)
  }

  async update(id: number, updateWhatsappDto: UpdateWhatsappDto,currentUser) {
     try {
      const retorno = await this.whatsapp.update(+id, updateWhatsappDto, currentUser);
      // console.log(retorno, HttpStatus.OK)
      return {
        message: 'sucesso',
        result: retorno
      };
    } catch (error) {
      // Tratamento de erro apropriado
      return {
        message: 'erro',
        error: error.message,
      };
    }
  }

  async remove(id: number) {
    try {
      const whatsapp = await this.findOne(+id)
      if (!whatsapp) {
        throw new Error('Failed to find whatsapp');
      }
      const state = await this.state(whatsapp)
      console.log(state)
      if(state?.data?.status === "CONNECTED"){
        const diconected = await this.diconectSession(whatsapp)
        if (!diconected.success) {
          throw new Error('Failed to logout whatsapp session.');
        }
      }
      return this.whatsapp.remove(+id);
    } catch (error) {
      return {
        message: 'erro',
        error: error.message,
      };
    }

  } 

  async startSession (data: any):Promise<any>{
    try {
      const body = JSON.stringify({
        session:data.session,
      });
      const config = {
        method: 'POST',
        url: `${data.endpoint}/start`,
        headers: {
          sessionkey:data.sessionkey,
          apitoken:data.token,
          'Content-Type': 'application/json',
        },
        data: body,
      }; 
      const response = await axios(config);
      return response.data
      
    } catch (error) {
      return {result:'error', error} 
    }
  }
  createSessionKey(numero) {
    const teclas = {
        0: 'A', 1: 'B', 2: 'B',
        3: 'D', 4: 'E', 5: 'F',
        6: 'G', 7: 'H', 8: 'I',
        9: 'J'
    };
    const letras = [];
    
    numero.toString().split('').forEach(digito => {
        const letra = teclas[digito];
        if (letra !== undefined) {
            letras.push(letra);
        }
    });
    return letras.join('');
}

   async getQrCode(data: any):Promise<any>{
     try {
           
        // Retornar base64 de QrCode
        const url = `${process.env.ENDPOINTUZAP}/getQrCode?session=${data.session}&sessionkey=${data.sessionkey}`
        const response = await axios.get(url,{ responseType: 'arraybuffer' });
        
        const buffer = Buffer.from(response.data);
        const base64String = buffer.toString('base64')

      return {success:true, base64:base64String} 
    } catch (error) {
      console.log(error.message)
      return {success:false, error} 
    } 
  }

  async state(data: any):Promise<any>{
    try {
      const body = JSON.stringify({
        session: data.session, 
      });
      const config = {
        method: 'POST',
        url: `${data.endpoint}/getSessionState`,
        headers: {
          sessionkey: data.sessionkey,
          'Content-Type': 'application/json',
        },
        data: body,
      };
      const response = await axios(config);
      console.log(response.data)
      return {success:true, data:response.data}
      
    } catch (error) {
      console.log(error.message)
      return {success:false, error:error}
    }
  }


  async diconectSession(data: any):Promise<any>{
    try {
      const body = JSON.stringify({
        session: data.session, 
      });
      const config = {
        method: 'POST',
        url: `${data.endpoint}/logoutSession`,
        headers: {
          sessionkey: data.sessionkey,
          'Content-Type': 'application/json',
        },
        data: body,
      };
      const response = await axios(config);
      return {success:true, data:response.data}
      
    } catch (error) {
      return {success:false, error:error}
    }
  }


}

