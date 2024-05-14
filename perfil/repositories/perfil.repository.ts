import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePerfilDto } from '../dto/create-perfil.dto';
import { PerfilEntity } from '../entities/perfil.entity';
import { UpdatePerfilDto } from '../dto/update-perfil.dto';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';

@Injectable()
export class PerfilRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPerfilDto: CreatePerfilDto): Promise<PerfilEntity> {
    try {
      return this.prisma.perfil.create({
        data: createPerfilDto,
      });
    } catch (error) {
      throw new Error('Não foi possível criar o perfil. Tente novamente mais tarde.');
    }
  }

  async findAll(): Promise<PerfilEntity[]> {
    try {
      return await this.prisma.perfil.findMany();
    } catch (error) {
      throw new Error('Não foi possível encontrar os perfis. Tente novamente mais tarde.');
    }
  }

  async findOne(idperfil: number): Promise<PerfilEntity> {
    try {
      const perfil = await this.prisma.perfil.findUnique({
        where: {
          idperfil,
        },
        include: {
          User: {
            select: {
              id: true,
              email: true,
              name: true,
              status: true,
            },
          },
        },
      });
      if (!perfil) {
        throw new NotFoundError('Perfil não encontrado.');
      }
      return perfil;
    } catch (error) {
      throw new Error('Não foi possível encontrar o perfil. Tente novamente mais tarde.');
    }
  }

  async update(idperfil: number, updatePerfilDto: UpdatePerfilDto): Promise<PerfilEntity> {
    try {
      return this.prisma.perfil.update({
        where: {
          idperfil,
        },
        data: updatePerfilDto,
      });
    } catch (error) {
      throw new Error('Não foi possível atualizar o perfil. Tente novamente mais tarde.');
    }
  }

  async remove(idperfil: number): Promise<PerfilEntity> {
    try {
      return this.prisma.perfil.delete({
        where: {
          idperfil,
        },
      });
    } catch (error) {
      throw new Error('Não foi possível remover o perfil. Tente novamente mais tarde.');
    }
  }
}

// /* eslint-disable prettier/prettier */
// import { Injectable } from '@nestjs/common';
// import { PrismaService } from 'src/prisma/prisma.service';
// import { CreatePerfilDto } from '../dto/create-perfil.dto';
// import { PerfilEntity } from '../entities/perfil.entity';
// import { UpdatePerfilDto } from '../dto/update-perfil.dto';

// @Injectable()
// export class PerfilRepository {
//   constructor(private readonly prisma: PrismaService) {}

//   async create(createPerfilDto: CreatePerfilDto): Promise<PerfilEntity> {
//     return this.prisma.perfil.create({
//       data: createPerfilDto,
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

//   async findAll(): Promise<PerfilEntity[]> {
//     return await this.prisma.perfil.findMany({
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

//   async findOne(idperfil: number): Promise<PerfilEntity> {
//     return this.prisma.perfil.findUnique({
//       where: {
//         idperfil,
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

//   async update(idperfil: number, updatePerfilDto: UpdatePerfilDto): Promise<PerfilEntity> {
//     return this.prisma.perfil.update({
//       where: {
//         idperfil,
//       },
//       data: updatePerfilDto,
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

//   async remove(idperfil: number): Promise<PerfilEntity> {
//     return this.prisma.perfil.delete({
//       where: {
//         idperfil,
//       },
//     });
//   }
// }
