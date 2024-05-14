import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateModeloDto } from './dto/create-modelo.dto';
import { UpdateModeloDto } from './dto/update-modelo.dto';
import { ModeloRepository } from './repositories/modelo.repository';
import { ModeloEntity } from './entities/modelo.entity';

@Injectable()
export class ModeloService {
  constructor(private readonly repository: ModeloRepository) {}

  async create(createModeloDto: CreateModeloDto): Promise<ModeloEntity> {
    const createdTemplate = await this.repository.create(createModeloDto);
    return createdTemplate;
  }

  async findAll(): Promise<ModeloEntity[]> {
    return this.repository.findAll();
  }

  async findOne(id: number): Promise<ModeloEntity> {
    const template = await this.repository.findOne(id);
    if (!template) {
      throw new NotFoundException('Template not found');
    }
    return template;
  }

  async update(id: number, updateModeloDto: UpdateModeloDto): Promise<ModeloEntity> {
    return this.repository.update(id, updateModeloDto);
  }

  async remove(id: number): Promise<ModeloEntity> {
    const template = await this.repository.findOne(id);
    if (!template) {
      throw new NotFoundException('Template not found');
    }
    return this.repository.remove(id);
  }
}
