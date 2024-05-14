import { Injectable } from '@nestjs/common';
import { PermissoesRepository } from './repositories/permissoes.repository';
import { CreatePermissoeDto } from './dto/create-permissoe.dto';
import { UpdatePermissoeDto } from './dto/update-permissoe.dto';
import { PermissoeEntity } from './entities/permissoe.entity';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class PermissoesService {
  constructor(private readonly repository: PermissoesRepository) {}

  // Função para criar uma permissão
  async create(
    createPermissoeDto: CreatePermissoeDto,
  ): Promise<PermissoeEntity> {
    const createdPermissoes = await this.repository.create(createPermissoeDto);

    return {
      ...createdPermissoes,
    };
  }

  // Função para encontrar as permissões de rotas para um usuário específico
  async findPermissionsRotas(currentUser: UserEntity) {
    // console.log(currentUser);
    const id = currentUser.id;
    const rotas = await this.repository.findPermissionsRotas(id);

    if (!rotas) {
      throw new NotFoundError('Rotas não encontradas para o usuário.');
    }

    return rotas;
  }

  // Função para encontrar todas as permissões
  findAll() {
    return this.repository.findAll();
  }

  // Função para encontrar uma permissão por ID
  async findOne(id: number) {
    const perfil = await this.repository.findOne(id);

    if (!perfil) {
      throw new NotFoundError('Permissão não encontrada.');
    }

    return perfil;
  }

  // Função para atualizar uma permissão por ID
  update(id: number, updatePermissoeDto: UpdatePermissoeDto) {
    return this.repository.update(id, updatePermissoeDto);
  }

  // Função para remover uma permissão por ID
  remove(id: number) {
    return this.repository.remove(id);
  }
}

// import { Injectable } from '@nestjs/common';
// import { PermissoesRepository } from './repositories/permissoes.repository';
// import { CreatePermissoeDto } from './dto/create-permissoe.dto';
// import { UpdatePermissoeDto } from './dto/update-permissoe.dto';
// import { PermissoeEntity } from './entities/permissoe.entity';
// import { NotFoundError } from 'src/common/errors/types/NotFoundError';
// import { UserEntity } from 'src/user/entities/user.entity';

// @Injectable()
// export class PermissoesService {
//   constructor(private readonly repository: PermissoesRepository) {}

//   async create(
//     createPermissoeDto: CreatePermissoeDto,
//   ): Promise<PermissoeEntity> {
//     const createdPermissoes = await this.repository.create({
//       ...createPermissoeDto,
//     });

//     return {
//       ...createdPermissoes,
//     };
//   }

//   async findPermissionsRotas(currentUser: UserEntity) {
//     console.log(currentUser);
//     const id = currentUser.id;
//     const rotas = await this.repository.findPermissionsRotas(id);

//     if (!rotas) {
//       throw new NotFoundError('Rotas nao encontradas.');
//     }

//     return rotas;
//   }

//   findAll() {
//     return this.repository.findAll();
//   }

//   async findOne(id: number) {
//     const perfil = await this.repository.findOne(id);

//     if (!perfil) {
//       throw new NotFoundError('Perfil não encontrado.');
//     }

//     return perfil;
//   }

//   update(id: number, updatePermissoeDto: UpdatePermissoeDto) {
//     return this.repository.update(id, updatePermissoeDto);
//   }

//   remove(id: number) {
//     return this.repository.remove(id);
//   }
// }
