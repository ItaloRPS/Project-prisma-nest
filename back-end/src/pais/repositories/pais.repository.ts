import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePaisDto } from '../dto/create-pais.dto';
import { PaisEntity } from '../entities/pais.entity';
import { UpdatePaisDto } from '../dto/update-pais.dto';

@Injectable()
export class PaisRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPaisDto: CreatePaisDto): Promise<PaisEntity> {
    try {
      return await this.prisma.pais.create({
        data: createPaisDto,
      });
    } catch (error) {
      // Implementar tratamento de erro
      throw new Error('Erro ao criar um novo registro de país');
    }
  }

  async findAll(): Promise<PaisEntity[]> {
    try {
      return await this.prisma.pais.findMany();
    } catch (error) {
      // Implementar tratamento de erro
      throw new Error('Erro ao recuperar todos os registros de país');
    }
  }

  async findOne(idpais: number): Promise<PaisEntity> {
    try {
      const pais = await this.prisma.pais.findUnique({
        where: {
          idpais,
        },
      });
      if (!pais) {
        throw new NotFoundException('Pais não encontrado');
      }
      return pais;
    } catch (error) {
      // Implementar tratamento de erro
      throw new Error('Erro ao recuperar o registro do país');
    }
  }

  async update(idpais: number, updatePaisDto: UpdatePaisDto): Promise<PaisEntity> {
    try {
      return await this.prisma.pais.update({
        where: {
          idpais,
        },
        data: updatePaisDto,
      });
    } catch (error) {
      // Implementar tratamento de erro
      throw new Error('Erro ao atualizar o registro do país');
    }
  }

  async remove(idpais: number): Promise<PaisEntity> {
    try {
      return await this.prisma.pais.delete({
        where: {
          idpais,
        },
      });
    } catch (error) {
      // Implementar tratamento de erro
      throw new Error('Erro ao remover o registro do país');
    }
  }
}

// /* eslint-disable prettier/prettier */
// import { Injectable } from '@nestjs/common';
// import { PrismaService } from 'src/prisma/prisma.service';
// import { CreatePaisDto } from '../dto/create-pais.dto';
// import { PaisEntity } from '../entities/pais.entity';
// import { UpdatePaisDto } from '../dto/update-pais.dto';

// @Injectable()
// export class PaisRepository {
//   constructor(private readonly prisma: PrismaService) {}

//   async create(createPaisDto: CreatePaisDto): Promise<PaisEntity> {
//     return this.prisma.pais.create({
//       data: createPaisDto,
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

//   async findAll(): Promise<PaisEntity[]> {
//     return await this.prisma.pais.findMany({
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

//   async findOne(idpais: number): Promise<PaisEntity> {
//     return this.prisma.pais.findUnique({
//       where: {
//         idpais,
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

//   async update(idpais: number, updatePaisDto: UpdatePaisDto): Promise<PaisEntity> {
//     return this.prisma.pais.update({
//       where: {
//         idpais,
//       },
//       data: updatePaisDto,
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

//   async remove(idpais: number): Promise<PaisEntity> {
//     return this.prisma.pais.delete({
//       where: {
//         idpais,
//       },
//     });
//   }
// }
