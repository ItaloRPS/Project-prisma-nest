/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateModeloDto } from '../dto/create-modelo.dto';
import { ModeloEntity } from '../entities/modelo.entity';
import { UpdateModeloDto } from '../dto/update-modelo.dto';

@Injectable()
export class ModeloRepository {
  private readonly logger = new Logger(ModeloRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createModeloDto: CreateModeloDto): Promise<ModeloEntity> {
    try {
      // Validar entrada de dados
      // Limpar dados se necessário
      const createdModelo = await this.prisma.modelo.create({
        data: createModeloDto,
      });
      // Log detalhado sobre a criação bem-sucedida
      this.logger.debug(`Novo modelo criado com sucesso: ${createdModelo.idmodelo}`);
      return createdModelo;
    } catch (error) {
      // Log detalhado sobre erros
      this.logger.error(`Erro ao criar novo modelo: ${error.message}`);
      throw error;
    }
  }

  async findAll(): Promise<ModeloEntity[]> {
    try {
      const modelos = await this.prisma.modelo.findMany();
      // Log detalhado sobre a recuperação de todos os modelo
      this.logger.debug(`Modelos recuperados com sucesso. Total: ${modelos.length}`);
      return modelos;
    } catch (error) {
      // Log detalhado sobre erros
      this.logger.error(`Erro ao recuperar todos os modelo: ${error.message}`);
      throw error;
    }
  }

  async findOne(idmodelo: number): Promise<ModeloEntity> {
    try {
      // Validar entrada de dados
      const modelos = await this.prisma.modelo.findUnique({
        where: {
          idmodelo,
        },
      });
      // Log detalhado sobre a recuperação de um modelo específico
      this.logger.debug(`Modelo recuperado com sucesso: ${modelos.idmodelo}`);
      return modelos;
    } catch (error) {
      // Log detalhado sobre erros
      this.logger.error(`Erro ao recuperar o modelo: ${error.message}`);
      throw error;
    }
  }

  async update(idmodelo: number, updateModeloDto: UpdateModeloDto): Promise<ModeloEntity> {
    try {
      // Validar entrada de dados
      // Limpar dados se necessário
      const updatedModelo = await this.prisma.modelo.update({
        where: {
          idmodelo,
        },
        data: updateModeloDto,
      });
      // Log detalhado sobre a atualização bem-sucedida
      this.logger.debug(`Modelo atualizado com sucesso: ${updatedModelo.idmodelo}`);
      return updatedModelo;
    } catch (error) {
      // Log detalhado sobre erros
      this.logger.error(`Erro ao atualizar o modelo: ${error.message}`);
      throw error;
    }
  }

  async remove(idmodelo: number): Promise<ModeloEntity> {
    try {
      // Validar entrada de dados
      const deletedModelo = await this.prisma.modelo.delete({
        where: {
          idmodelo,
        },
      });
      // Log detalhado sobre a exclusão bem-sucedida
      this.logger.debug(`Modelo excluído com sucesso: ${deletedModelo.idmodelo}`);
      return deletedModelo;
    } catch (error) {
      // Log detalhado sobre erros
      this.logger.error(`Erro ao excluir o modelo: ${error.message}`);
      throw error;
    }
  }
}
