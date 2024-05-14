import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateConfigprodutoDto } from '../dto/create-configproduto.dto';
import { ConfigprodutoEntity } from '../entities/configproduto.entity';
import { UpdateConfigprodutoDto } from '../dto/update-configproduto.dto';

@Injectable()
export class ConfigProdutoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createConfigprodutoDto: CreateConfigprodutoDto): Promise<ConfigprodutoEntity> {
    const createdConfigProduto = await this.prisma.config_produto.create({
      data: createConfigprodutoDto,
    });
    return createdConfigProduto;
  }

  async findAll(): Promise<ConfigprodutoEntity[]> {
    return this.prisma.config_produto.findMany();
  }

  async findOne(idconfigproduto: number): Promise<ConfigprodutoEntity> {
    const configProduto = await this.prisma.config_produto.findUnique({
      where: { idconfigproduto },
    });
    if (!configProduto) {
      throw new NotFoundException('Configuração de produto não encontrada.');
    }
    return configProduto;
  }

  async update(idconfigproduto: number, updateConfigprodutoDto: UpdateConfigprodutoDto): Promise<ConfigprodutoEntity> {
    return this.prisma.config_produto.update({
      where: { idconfigproduto },
      data: updateConfigprodutoDto,
    });
  }

  async remove(idconfigproduto: number): Promise<void> {
    const deletedConfigProduto = await this.prisma.config_produto.delete({
      where: { idconfigproduto },
    });
    if (!deletedConfigProduto) {
      throw new NotFoundException('Configuração de produto não encontrada para exclusão.');
    }
  }
}

// /* eslint-disable prettier/prettier */
// import { Injectable } from '@nestjs/common';
// import { PrismaService } from 'src/prisma/prisma.service';
// import { CreateConfigprodutoDto } from '../dto/create-configproduto.dto';
// import { ConfigprodutoEntity } from '../entities/configproduto.entity';
// import { UpdateConfigprodutoDto } from '../dto/update-configproduto.dto';

// @Injectable()
// export class ConfigProdutoRepository {
//   constructor(private readonly prisma: PrismaService) {}

//   async create(
//     createConfigprodutoDto: CreateConfigprodutoDto,
//   ): Promise<ConfigprodutoEntity> {
//     return this.prisma.config_produto.create({
//       data: createConfigprodutoDto,
//       // include: {
//       //   posts: {
//       //     select: {
//       //       title: true,
//       //       createdAt: true,
//       //     },
//       //   },
//       // },
//     });
//   }

//   async findAll(): Promise<ConfigprodutoEntity[]> {
//     return await this.prisma.config_produto.findMany({
//       // include: {
//       //   posts: {
//       //     select: {
//       //       title: true,
//       //       createdAt: true,
//       //     },
//       //   },
//       // },
//     });
//   }

//   async findOne(idconfigproduto: number): Promise<ConfigprodutoEntity> {
//     return this.prisma.config_produto.findUnique({
//       where: {
//         idconfigproduto,
//       },
//       // include: {
//       //   posts: {
//       //     select: {
//       //       title: true,
//       //       createdAt: true,
//       //     },
//       //   },
//       // },
//     });
//   }

//   async update(
//     idconfigproduto: number,
//     updateEmpresaDto: UpdateConfigprodutoDto,
//   ): Promise<ConfigprodutoEntity> {
//     return this.prisma.config_produto.update({
//       where: {
//         idconfigproduto,
//       },
//       data: updateEmpresaDto,
//       // include: {
//       //   posts: {
//       //     select: {
//       //       title: true,
//       //       createdAt: true,
//       //     },
//       //   },
//       // },
//     });
//   }

//   async remove(idconfigproduto: number): Promise<ConfigprodutoEntity> {
//     return this.prisma.config_produto.delete({
//       where: {
//         idconfigproduto,
//       },
//     });
//   }
// }
