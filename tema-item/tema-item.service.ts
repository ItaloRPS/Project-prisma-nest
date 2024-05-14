import { Injectable } from '@nestjs/common';
import { CreateTemaItemDto } from './dto/create-tema-item.dto';
import { UpdateTemaItemDto } from './dto/update-tema-item.dto';
import { TemaItemEntity } from './entities/tema-item.entity';
import { TemaItemRepository } from './repositories/tema-item.repository';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class TemaItemService {
  constructor(private readonly repository: TemaItemRepository) {}

  async create(createTemaItemDto: CreateTemaItemDto): Promise<TemaItemEntity> {
    const createTemaItem = await this.repository.create({
      ...createTemaItemDto,
    });
    return createTemaItem;
  }

  async findAll(): Promise<TemaItemEntity[]> {
    return this.repository.findAll();
  }

  async findOne(id: number): Promise<TemaItemEntity> {
    const temaItem = await this.repository.findOne(id);

    if (!temaItem) {
      throw new NotFoundException('Tema item not found.');
    }

    return temaItem;
  }

  async update(id: number, updateTemaItemDto: UpdateTemaItemDto): Promise<TemaItemEntity> {
    return this.repository.update(id, updateTemaItemDto);
  }

  async remove(id: number): Promise<TemaItemEntity> {
    const deletedTemaItem = await this.repository.remove(id);

    if (!deletedTemaItem) {
      throw new NotFoundException('Tema item not found for deletion.');
    }

    return deletedTemaItem;
  }
}
