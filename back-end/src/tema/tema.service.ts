import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTemaDto } from './dto/create-tema.dto';
import { UpdateTemaDto } from './dto/update-tema.dto';
import { TemaRepository } from './repositories/tema.repository';
import { TemaEntity } from './entities/tema.entity';

@Injectable()
export class TemaService {
  constructor(private readonly repository: TemaRepository) {}

  async create(createTemaDto: CreateTemaDto, currentUser): Promise<TemaEntity> {
    try {
      const createLayout = await this.repository.create(createTemaDto, currentUser);
      return createLayout;
    } catch (error) {
      // Faça o tratamento apropriado para o erro de criação
      throw new Error(
        'Erro ao criar o tema. Verifique os dados e tente novamente.',
      );
    }
  }

  async findAll(): Promise<TemaEntity[]> {
    try {
      return await this.repository.findAll();
    } catch (error) {
      // Trate o erro de busca de todos os layouts
      throw new Error(
        'Erro ao buscar todos os layouts. Tente novamente mais tarde.',
      );
    }
  }

  async findAlltemaDefault(currentUser): Promise<TemaEntity[]> {
    try {
      return await this.repository.findAlltemaDefault(currentUser);
    } catch (error) {
      // Trate o erro de busca de todos os layouts
      throw new Error(
        'Erro ao buscar todos os layouts. Tente novamente mais tarde.',
      );
    }
  }

  async findOne(id: number): Promise<TemaEntity> {
    const layout = await this.repository.findOne(id);
    if (!layout) {
      throw new NotFoundException('tema não encontrado.');
    }
    return layout;
  }

  async update(
    id: number,
    updateTemaDto: UpdateTemaDto,
    currentUser: string
  ): Promise<TemaEntity> {
    try {
      return await this.repository.update(id, updateTemaDto, currentUser);
    } catch (error) {
      // Trate o erro de atualização do layout
      throw new Error(
        'Erro ao atualizar o layout. Verifique os dados e tente novamente.',
      );
    }
  }

  async updateTemaItem(
    id: number,
    updateTemaDto: any,
    currentUser: string
  ): Promise<TemaEntity> {
    try {
      return await this.repository.updateTemaItem(
          id,
          updateTemaDto,
          currentUser
        );
    } catch (error) {
      // Trate o erro de atualização do item do layout e inclua o erro original para depuração
      throw new NotFoundException(`${error.message}`);
    }
  }

  async remove(id: number): Promise<TemaEntity> {
    try {
      const deletedTema = await this.repository.remove(id);
      if (!deletedTema) {
        throw new NotFoundException('tema não encontrado para exclusão.');
      }
      return deletedTema;
    } catch (error) {
      // Trate o erro de exclusão do layout
      throw new Error(
        'Erro ao excluir o tema. Verifique os dados e tente novamente.',
      );
    }
  }
}
