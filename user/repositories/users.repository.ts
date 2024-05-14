/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';
import { UnauthorizedError } from 'src/common/errors/types/UnauthorizedError';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';
import * as bcrypt from 'bcrypt';
import { int } from 'aws-sdk/clients/datapipeline';
import { LeadEntity } from 'src/lead/entities/lead.entity';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const createdUser = await this.prisma.user.create({
        data: createUserDto,
        select: {
          id: true,
          email: true,
          name: true,
          idperfil: true,
          status: true,
        },
      });

      return createdUser;
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }

  async userEmpresa(idusuario: int, idempresa: int) {
    try {
      const retorno = await this.prisma.userEmpresa.create({
        data: {
          idusuario,
          idempresa,
        },
      });

      return retorno;
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }

  async createUserLead(createUserLead): Promise<any> {
    try {
      const findHash = await this.prisma.acesso.findUnique({
        where: {
          hash: createUserLead.hash
        },
        include: {
          lead: {}
        }
      })

      if (findHash.lead.length > 0) {
        throw new Error('Já existe cadastro para o link informado.');
      }
      const { hash, lead, ...createUser } = createUserLead;
      const user =  await this.prisma.user.findFirst({
        select:{id:true,name:true,email:true,perfil:true},
        where:{email:lead.email}
      })

      if(!user){
        return await this.prisma.user.create({
          data: {
            ...createUser,
            lead: {
              create: {
                ...lead
              }
            }
          },
          select: {
            id: true,
            email: true,
            name: true,
            idperfil: true,
            status: true,
            lead: true,
          },
        });
        
      }
      lead.idusuario = user.id
      return await this.prisma.lead.create({
        data: {
         ...lead
        },
        select:{
          nome:true,
          email:true,
          acesso:true
        },
      });

    } catch (error) {
      // Lidar com erros de transação
      throw new Error(error.message);
    }
  }

  async findAll() {
    return await this.prisma.user.findMany({
      select: { id: true, email: true, name: true, perfil: {}, status: true },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        status: true,
        perfil: {},
        UserEmpresa: {
          include: {
            empresa: {},
          },
        },
        lead: {},
      },
    });

    if (!user) {
      throw new NotFoundError('Usuário não encontrado.');
    }

    return user;
  }

  async findUnique(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
        idperfil: true,
        perfil: {},
        UserEmpresa: {},
        status: true,
        passwordResetToken:true,
        passwordResetExpires:true,
      },
    });
  }

  async findUniqueEmpresa(id: int, idempresa: int) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
        idperfil: true,
        perfil: {},
        UserEmpresa: {
          where: { idempresa },
        },
        status: true,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
      select: { id: true, email: true, name: true },
    });

    return updatedUser;
  }

  async remove(id: number) {
    const deletedUser = await this.prisma.user.delete({
      where: { id },
      select: { id: true, email: true, name: true },
    });

    return deletedUser;
  }

  async findUniqueToken(passwordResetToken: string){
    return this.prisma.user.findFirst({
      where: { passwordResetToken },
      select: { id: true, email: true, name: true, idperfil: true, passwordResetExpires:true, perfil:{},},
    });
  }

}
