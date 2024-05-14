/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAcessoDto } from '../dto/create-acesso.dto';
import { AcessoEntity } from '../entities/acesso.entity';
import { UpdateAcessoDto } from '../dto/update-acesso.dto';

@Injectable()
export class AcessoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAcessoDto: CreateAcessoDto): Promise<AcessoEntity> {
    try {
      return await this.prisma.acesso.create({
        data: createAcessoDto,
      });
    } catch (error) {
      // Tratar adequadamente o erro de criação
      throw new Error('Erro ao criar o acesso.');
    }
  }

  async createMany(acessos: []) {
    try {
      await this.prisma.acesso.createMany({
        data: acessos,
        skipDuplicates: false,
      });
    } catch (error) {
      // Tratar adequadamente o erro de criação múltipla
      throw new Error('Erro ao criar acessos em massa.');
    }
  }

  async findAll(): Promise<AcessoEntity[]> {
    try {
      return await this.prisma.acesso.findMany({});
    } catch (error) {
      // Tratar adequadamente o erro de busca
      throw new Error('Erro ao buscar acessos.');
    }
  }

  async findOne(idacesso: number): Promise<AcessoEntity> {
    try {
      const acesso = await this.prisma.acesso.findUnique({
        where: {
          idacesso,
        },
      });
      if (!acesso) {
        throw new NotFoundException('Acesso não encontrado.');
      }
      return acesso;
    } catch (error) {
      // Tratar adequadamente o erro de busca por ID
      throw new Error('Erro ao buscar acesso por ID.');
    }
  }

  async findAcessoURL(hash: string) {
    try {
      return await this.prisma.acesso.findUnique({
        where: {
          hash,
        },
        include: {
          lote: {
            include: {
              produto: {},
              tema: {
                include: {
                  temaitem: {},
                },
              },
            },
          },
          tema: {
            include: {
              temaitem: {},
            },
          },
          lead: {
            include: {
              User: {
                select: {
                  id: true,
                  email: true,
                  name: true,
                  idperfil: true,
                  status: true
                }
              },
            },
          },
        },
      });
    } catch (error) {
      // Tratar adequadamente o erro de busca por URL
      throw new Error('Erro ao buscar acesso por URL.');
    }
  }

  async update(
    idacesso: number,
    updateAcessoDto: UpdateAcessoDto,
  ): Promise<AcessoEntity> {
    try {
      return await this.prisma.acesso.update({
        where: {
          idacesso,
        },
        data: updateAcessoDto,
      });
    } catch (error) {
      // Tratar adequadamente o erro de atualização
      throw new Error('Erro ao atualizar o acesso.');
    }
  }

  async remove(idacesso: number): Promise<void> {
    try {
      await this.prisma.acesso.delete({
        where: {
          idacesso,
        },
      });
    } catch (error) {
      // Tratar adequadamente o erro de remoção
      throw new Error('Erro ao remover o acesso.');
    }
  }
}
