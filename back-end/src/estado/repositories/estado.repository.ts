/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEstadoDto } from '../dto/create-estado.dto';
import { EstadoEntity } from '../entities/estado.entity';
import { UpdateEstadoDto } from '../dto/update-estado.dto';

@Injectable()
export class EstadoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createEstadoDto: CreateEstadoDto): Promise<EstadoEntity> {
    try {
      return await this.prisma.estado.create({
        data: createEstadoDto,
      });
    } catch (error) {
      // Realize o tratamento de erro adequado aqui.
      throw new Error('Erro ao criar o estado.');
    }
  }

  async findAll(idpais: number): Promise<EstadoEntity[]> {
    try {
      return await this.prisma.estado.findMany({
        where:{idpais:idpais}
      });
    } catch (error) {
      // Realize o tratamento de erro adequado aqui.
      throw new Error('Erro ao buscar todos os estados.');
    }
  }

  async findOne(idestado: number): Promise<EstadoEntity> {
    const estado = await this.prisma.estado.findUnique({
      where: {
        idestado,
      },
    });

    if (!estado) {
      throw new NotFoundException('Estado não encontrado.');
    }

    return estado;
  }

  async update(idestado: number, updateEstadoDto: UpdateEstadoDto): Promise<EstadoEntity> {
    try {
      return await this.prisma.estado.update({
        where: {
          idestado,
        },
        data: updateEstadoDto,
      });
    } catch (error) {
      // Realize o tratamento de erro adequado aqui.
      throw new Error('Erro ao atualizar o estado.');
    }
  }

  async remove(idestado: number): Promise<EstadoEntity> {
    try {
      const deletedEstado = await this.prisma.estado.delete({
        where: {
          idestado,
        },
      });

      if (!deletedEstado) {
        throw new NotFoundException('Estado não encontrado para exclusão.');
      }

      return deletedEstado;
    } catch (error) {
      // Realize o tratamento de erro adequado aqui.
      throw new Error('Erro ao remover o estado.');
    }
  }
}

// /* eslint-disable prettier/prettier */
// import { Injectable } from '@nestjs/common';
// import { PrismaService } from 'src/prisma/prisma.service';
// import { CreateEstadoDto } from '../dto/create-estado.dto';
// import { EstadoEntity } from '../entities/estado.entity';
// import { UpdateEstadoDto } from '../dto/update-estado.dto';

// @Injectable()
// export class EstadoRepository {
//   constructor(private readonly prisma: PrismaService) {}

//   async create(createEstadoDto: CreateEstadoDto): Promise<EstadoEntity> {
//     return this.prisma.estado.create({
//       data: createEstadoDto,
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

//   async findAll(): Promise<EstadoEntity[]> {
//     return await this.prisma.estado.findMany({
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

//   async findOne(idestado: number): Promise<EstadoEntity> {
//     return this.prisma.estado.findUnique({
//       where: {
//         idestado,
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

//   async update(idestado: number, updateEstadoDto: UpdateEstadoDto): Promise<EstadoEntity> {
//     return this.prisma.estado.update({
//       where: {
//         idestado,
//       },
//       data: updateEstadoDto,
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

//   async remove(idestado: number): Promise<EstadoEntity> {
//     return this.prisma.estado.delete({
//       where: {
//         idestado,
//       },
//     });
//   }
// }
