/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLojistaDto } from '../dto/create-lojista.dto';
import { LojistaEntity } from '../entities/lojista.entity';
import { UpdateLojistaDto } from '../dto/update-lojista.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class LojistaRepository {
  constructor(private readonly prisma: PrismaService) {}

  // Método de criação de lote
  async create(createLojistaDto: CreateLojistaDto): Promise<LojistaEntity> {
    return this.prisma.lojista.create({
      data: createLojistaDto,
    });
  }

  async findAll(currentUser, empresa): Promise<LojistaEntity[]> {
    try {
      const { id, idempresa, perfil } = currentUser;
      let lojista = [];

      if (perfil.nome === 'Admin') {
        lojista = await this.prisma
          .$queryRaw(Prisma.raw(`select distinct l.idlojista,ue.idempresa,p.idpais ,p.descricao as pais,e.idestado, e.descricao as estato, c.idcidade ,c.descricao as cidade,u.name,u.email,u.status,u.id as iduser 
                                              from lojista l 
                                              inner join pais p  
                                              on l.idpais  =p.idpais  
                                              inner join estado e  
                                              on l.idestado = e.idestado  
                                              left join cidade c  
                                              on l.idcidade = c.idcidade  
                                              inner join User u 
                                                on l.idUser  =u.id  
                                              inner join UserEmpresa ue 
                                                on u.id = ue.idusuario  
                                              where u.idperfil = 4
                                              ${empresa?`and ue.idempresa=${empresa}`:''}`));
      }  else if (perfil.nome === 'Empresa') {
        lojista = await this.prisma
          .$queryRaw(Prisma.raw(`select distinct l.idlojista,ue.idempresa,p.idpais ,p.descricao as pais,e.idestado, e.descricao as estato, c.idcidade ,c.descricao as cidade,u.name,u.email,u.status,u.id as iduser 
                                              from lojista l 
                                              inner join pais p  
                                              on l.idpais  =p.idpais  
                                              inner join estado e  
                                              on l.idestado = e.idestado  
                                              left join cidade c  
                                              on l.idcidade = c.idcidade  
                                              inner join User u 
                                                on l.idUser  =u.id  
                                              inner join UserEmpresa ue 
                                                on u.id = ue.idusuario  
                                              where  u.idperfil = 4 
                                              and ue.idempresa in(${idempresa.toString()})
                                              ${empresa?`and ue.idempresa=${empresa}`:''}`));
        // console.log(produto);
      }

      return lojista;
    } catch (error) {
      console.error('Ocorreu um erro ao executar a busca dos produtos:', error);
    }
  }

  async findOneFilter(idestado: number, idcidade: number, idempresa: number): Promise<any> {
    return this.prisma.lojista.findMany({
      where: {
        idcidade,
        idestado,
        idempresa
      },
      include: {
        User: { select: { id: true, name: true } },
      },
    });
  }

  // Método para buscar um lote por ID
  async findOne(idUser: number): Promise<any> {
    const region =  await this.prisma.lojista.findMany({
      where: {
        idUser: idUser,
        User: { idperfil: 4 },
      },
      include: {
        User: { select: { id: true, name: true } },
        cidade: { select: { codcidade: true, descricao: true } },
        estado: { select: { codetd: true, descricao: true } },
        pais: { select: { codpais: true, descricao: true } },
        empresa: true,
      },
    });
    if(!region.length){
      return this.prisma.user.findMany({
        where: {
          id:idUser, 
          idperfil:4
        },
        select:{
          id:true,
          name:true
        }
      });
    }
    return region
  }

  async findAllUserShopkeeper(): Promise<any> {
    return this.prisma.user.findMany({
      where: {
        idperfil: 4,
      },
      select: {
        id: true,
        idperfil: true,
        name: true,
        email: true,
        status: true,
      },
    });
  }

  async update(
    idlojista: number,
    updateLojistaDto: UpdateLojistaDto,
  ): Promise<LojistaEntity> {
    return this.prisma.lojista.update({
      where: {
        idlojista,
      },
      data: updateLojistaDto,
    });
  }

  // Método para remover um lote
  async remove(idlojista: number): Promise<LojistaEntity> {
    return this.prisma.lojista.delete({
      where: {
        idlojista,
      },
    });
  }
}
