/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCidadeDto } from '../dto/create-cidade.dto';
import { CidadeEntity } from '../entities/cidade.entity';
import { UpdateCidadeDto } from '../dto/update-cidade.dto';
import { EstadoEntity } from 'src/estado/entities/estado.entity';

@Injectable()
export class CidadeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCidadeDto: CreateCidadeDto): Promise<CidadeEntity> {
    try {
      return await this.prisma.cidade.create({
        data: createCidadeDto,
      });
    } catch (error) {
      throw new Error(
        'Erro ao criar cidade. Verifique os dados e tente novamente.',
      );
    }
  }

  async findAll(): Promise<CidadeEntity[]> {
    try {
      return await this.prisma.cidade.findMany();
    } catch (error) {
      throw new Error(
        'Erro ao buscar cidades. Por favor, tente novamente mais tarde.',
      );
    }
  }

  async findOne(idcidade: number): Promise<CidadeEntity | null> {
    try {
      return await this.prisma.cidade.findUnique({
        where: {
          idcidade,
        },
      });
    } catch (error) {
      throw new Error(
        'Erro ao buscar a cidade. Por favor, tente novamente mais tarde.',
      );
    }
  }

  async findOneEstado(id: number): Promise<EstadoEntity | null> {
    try {
      return await this.prisma.estado.findUnique({
        where: {
          idestado: id,
        },
        include:{
          cidade:true
        }
      });
    } catch (error) {
      throw new Error(
        'Erro ao buscar a cidade. Por favor, tente novamente mais tarde.',
      );
    }
  }

  async update(
    idcidade: number,
    updateCidadeDto: UpdateCidadeDto,
  ): Promise<CidadeEntity | null> {
    try {
      return await this.prisma.cidade.update({
        where: {
          idcidade,
        },
        data: updateCidadeDto,
      });
    } catch (error) {
      throw new Error(
        'Erro ao atualizar a cidade. Verifique os dados e tente novamente.',
      );
    }
  }

  async remove(idcidade: number): Promise<CidadeEntity | null> {
    try {
      return await this.prisma.cidade.delete({
        where: {
          idcidade,
        },
      });
    } catch (error) {
      throw new Error(
        'Erro ao excluir a cidade. Verifique o ID e tente novamente.',
      );
    }
  }
}
