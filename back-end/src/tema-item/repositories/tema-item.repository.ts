import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTemaItemDto } from '../dto/create-tema-item.dto';
import { TemaItemEntity } from '../entities/tema-item.entity';
import { UpdateTemaItemDto } from '../dto/update-tema-item.dto';

@Injectable()
export class TemaItemRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTemaItemDto: CreateTemaItemDto): Promise<TemaItemEntity> {
    return this.prisma.temaitem.create({
      data: createTemaItemDto,
    });
  }

  async findAll(): Promise<TemaItemEntity[]> {
    return this.prisma.temaitem.findMany();
  }

  async findOne(idtemaitem: number): Promise<TemaItemEntity> {
    const temaItem = await this.prisma.temaitem.findUnique({
      where: {
        idtemaitem,
      },
    });

    if (!temaItem) {
      throw new NotFoundException('Tema item not found.');
    }

    return temaItem;
  }

  async update(idtemaitem: number, updateTemaItemDto: UpdateTemaItemDto): Promise<TemaItemEntity> {
    return this.prisma.temaitem.update({
      where: {
        idtemaitem,
      },
      data: updateTemaItemDto,
    });
  }

  async remove(idtemaitem: number): Promise<TemaItemEntity> {
    const deletedTemaItem = await this.prisma.temaitem.delete({
      where: {
        idtemaitem,
      },
    });

    if (!deletedTemaItem) {
      throw new NotFoundException('Tema item not found for deletion.');
    }

    return deletedTemaItem;
  }
}
