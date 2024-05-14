import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCidadeDto } from './dto/create-cidade.dto';
import { UpdateCidadeDto } from './dto/update-cidade.dto';
import { CidadeRepository } from './repositories/cidade.repository';
import { CidadeEntity } from './entities/cidade.entity';
import { EstadoEntity } from 'src/estado/entities/estado.entity';

@Injectable()
export class CidadeService {
  constructor(private readonly repository: CidadeRepository) {}

  async create(createCidadeDto: CreateCidadeDto): Promise<CidadeEntity> {
    try {
      return await this.repository.create(createCidadeDto);
    } catch (error) {
      // Trate o erro adequadamente e inclua a mensagem de erro original para depuração
      throw new Error('Falha ao criar a cidade. Verifique seus dados de entrada e tente novamente.');
    }
  }

  async findAll(): Promise<CidadeEntity[]> {
    try {
      return await this.repository.findAll();
    } catch (error) {
      throw new Error('Falha ao buscar cidades. Por favor, tente novamente mais tarde.');
    }
  }

  async findOne(id: number): Promise<CidadeEntity> {
    try {
      const cidade = await this.repository.findOne(id);
      if (!cidade) {
        throw new NotFoundException('Cidade não encontrada.');
      }
      return cidade;
    } catch (error) {
      throw new Error('Falha ao buscar a cidade. Por favor, tente novamente mais tarde.');
    }
  }

  async findOneEstado(id: number): Promise<EstadoEntity> {
    try {
      const cidade = await this.repository.findOneEstado(id);
      if (!cidade) {
        throw new NotFoundException('Cidade não encontrada.');
      }
      return cidade;
    } catch (error) {
      throw new Error('Falha ao buscar a cidade. Por favor, tente novamente mais tarde.');
    }
  }

  async update(id: number, updateCidadeDto: UpdateCidadeDto): Promise<CidadeEntity | null> {
    try {
      return await this.repository.update(id, updateCidadeDto);
    } catch (error) {
      throw new Error('Falha ao atualizar a cidade. Verifique seus dados de entrada e tente novamente.');
    }
  }

  async remove(id: number): Promise<CidadeEntity | null> {
    try {
      return await this.repository.remove(id);
    } catch (error) {
      throw new Error('Falha ao excluir a cidade. Por favor, verifique o ID fornecido e tente novamente.');
    }
  }
}
