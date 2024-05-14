import { Injectable } from '@nestjs/common';
import { CreatePerfilDto } from './dto/create-perfil.dto';
import { UpdatePerfilDto } from './dto/update-perfil.dto';
import { PerfilRepository } from './repositories/perfil.repository';
import { PerfilEntity } from './entities/perfil.entity';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';

@Injectable()
export class PerfilService {
  constructor(private readonly repository: PerfilRepository) {}

  async create(createPerfilDto: CreatePerfilDto): Promise<PerfilEntity> {
    try {
      const createdPerfil = await this.repository.create({
        ...createPerfilDto,
      });
      return createdPerfil;
    } catch (error) {
      // Trate o erro de forma apropriada e retorne mensagens de erro significativas.
      throw new Error('Não foi possível criar o perfil. Tente novamente mais tarde.');
    }
  }

  async findAll(): Promise<PerfilEntity[]> {
    try {
      const perfis = await this.repository.findAll();
      return perfis;
    } catch (error) {
      throw new Error('Não foi possível encontrar perfis. Tente novamente mais tarde.');
    }
  }

  async findOne(id: number): Promise<PerfilEntity> {
    try {
      const perfil = await this.repository.findOne(id);
      if (!perfil) {
        throw new NotFoundError('Perfil não encontrado.');
      }
      return perfil;
    } catch (error) {
      throw new Error('Não foi possível encontrar o perfil. Tente novamente mais tarde.');
    }
  }

  async update(id: number, updatePerfilDto: UpdatePerfilDto): Promise<PerfilEntity> {
    try {
      const updatedPerfil = await this.repository.update(id, updatePerfilDto);
      return updatedPerfil;
    } catch (error) {
      throw new Error('Não foi possível atualizar o perfil. Tente novamente mais tarde.');
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.repository.remove(id);
    } catch (error) {
      throw new Error('Não foi possível remover o perfil. Tente novamente mais tarde.');
    }
  }
}

// import { Injectable } from '@nestjs/common';
// import { CreatePerfilDto } from './dto/create-perfil.dto';
// import { UpdatePerfilDto } from './dto/update-perfil.dto';
// import { PerfilRepository } from './repositories/perfil.repository';
// import { PerfilEntity } from './entities/perfil.entity';
// import { NotFoundError } from 'src/common/errors/types/NotFoundError';

// @Injectable()
// export class PerfilService {
//   constructor(private readonly repository: PerfilRepository) {}

//   async create(createPerfilDto: CreatePerfilDto): Promise<PerfilEntity> {
//     const createdPerfil = await this.repository.create({
//       ...createPerfilDto,
//     });

//     return {
//       ...createdPerfil,
//     };
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

//   update(id: number, updatePerfilDto: UpdatePerfilDto) {
//     return this.repository.update(id, updatePerfilDto);
//   }

//   remove(id: number) {
//     return this.repository.remove(id);
//   }
// }
