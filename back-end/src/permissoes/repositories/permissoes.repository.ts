/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePermissoeDto } from '../dto/create-permissoe.dto';
import { PermissoeEntity } from '../entities/permissoe.entity';
import { UpdatePermissoeDto } from '../dto/update-permissoe.dto';

@Injectable()
export class PermissoesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPermissoeDto: CreatePermissoeDto): Promise<PermissoeEntity> {
    try {
      return await this.prisma.permissoes.create({
        data: createPermissoeDto,
      });
    } catch (error) {
      // Lidar com erros de criação aqui
      throw new Error(`Erro ao criar permissão: ${error.message}`);
    }
  }

  async findPermissionsRotas(id: number) {
    try {
      return await this.prisma.$queryRaw`select pe.idpermissoes as id, pe.nome as label, pe.icone as icone,pe.rota as 'key'
                                          from User us
                                          inner join perfil p on us.idperfil = p.idperfil
                                          inner join permissoes pe on p.idperfil = pe.idperfil
                                          where us.id = ${id};`;
    } catch (error) {
      // Lidar com erros de consulta aqui
      throw new Error(`Erro na consulta de permissões de rotas: ${error.message}`);
    }
  }

  async findAll(): Promise<PermissoeEntity[]> {
    try {
      return await this.prisma.permissoes.findMany();
    } catch (error) {
      // Lidar com erros de busca aqui
      throw new Error(`Erro ao buscar permissões: ${error.message}`);
    }
  }

  async findOne(idpermissoes: number): Promise<PermissoeEntity> {
    try {
      return await this.prisma.permissoes.findUnique({
        where: {
          idpermissoes,
        },
      });
    } catch (error) {
      // Lidar com erros de busca aqui
      throw new Error(`Erro ao buscar permissão por ID: ${error.message}`);
    }
  }

  async update(idpermissoes: number, updatePerfilDto: UpdatePermissoeDto): Promise<PermissoeEntity> {
    try {
      return await this.prisma.permissoes.update({
        where: {
          idpermissoes,
        },
        data: updatePerfilDto,
      });
    } catch (error) {
      // Lidar com erros de atualização aqui
      throw new Error(`Erro ao atualizar permissão: ${error.message}`);
    }
  }

  async remove(idpermissoes: number): Promise<PermissoeEntity> {
    try {
      return await this.prisma.permissoes.delete({
        where: {
          idpermissoes,
        },
      });
    } catch (error) {
      // Lidar com erros de remoção aqui
      throw new Error(`Erro ao remover permissão: ${error.message}`);
    }
  }
}

// /* eslint-disable prettier/prettier */
// import { Injectable } from '@nestjs/common';
// import { PrismaService } from 'src/prisma/prisma.service';
// import { CreatePermissoeDto } from '../dto/create-permissoe.dto';
// import { PermissoeEntity } from '../entities/permissoe.entity';
// import { UpdatePermissoeDto } from '../dto/update-permissoe.dto';

// @Injectable()
// export class PermissoesRepository {
//   constructor(private readonly prisma: PrismaService) {}

//   async create(createPermissoeDto: CreatePermissoeDto): Promise<PermissoeEntity> {
//     return this.prisma.permissoes.create({
//       data: createPermissoeDto,
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

//   async findPermissionsRotas(id: number) {
//     return await this.prisma.$queryRaw`select pe.idpermissoes as id, pe.nome as label, pe.rota as 'key'
//                                         from User us
//                                         inner join perfil p on us.id = p.idusuario
//                                         inner join permissoes pe on p.idperfil = pe.idperfil
//                                         where us.id = ${id} ;`
//   }

//   async findAll(): Promise<PermissoeEntity[]> {
//     return await this.prisma.permissoes.findMany({
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

//   async findOne(idpermissoes: number): Promise<PermissoeEntity> {
//     return this.prisma.permissoes.findUnique({
//       where: {
//         idpermissoes,
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

//   async update(idpermissoes: number, updatePerfilDto: UpdatePermissoeDto): Promise<PermissoeEntity> {
//     return this.prisma.permissoes.update({
//       where: {
//         idpermissoes,
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

//   async remove(idpermissoes: number): Promise<PermissoeEntity> {
//     return this.prisma.permissoes.delete({
//       where: {
//         idpermissoes,
//       },
//     });
//   }
// }
