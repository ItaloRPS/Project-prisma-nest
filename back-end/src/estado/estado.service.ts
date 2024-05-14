import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEstadoDto } from './dto/create-estado.dto';
import { UpdateEstadoDto } from './dto/update-estado.dto';
import { EstadoRepository } from './repositories/estado.repository';
import { EstadoEntity } from './entities/estado.entity';

@Injectable()
export class EstadoService {
  constructor(private readonly repository: EstadoRepository) {}

  async create(createEstadoDto: CreateEstadoDto): Promise<EstadoEntity> {
    try {
      const createEstado = await this.repository.create(createEstadoDto);
      return createEstado;
    } catch (error) {
      // Trate o erro adequadamente, talvez com um logger ou outra ação apropriada.
      throw new Error('Erro ao criar o estado.');
    }
  }

  async findAll(idpais: number): Promise<EstadoEntity[]> {
    try {
      const estados = await this.repository.findAll(idpais);
      return estados;
    } catch (error) {
      // Trate o erro adequadamente, talvez com um logger ou outra ação apropriada.
      throw new Error('Erro ao buscar todos os estados.');
    }
  }

  async findOne(id: number): Promise<EstadoEntity> {
    const estado = await this.repository.findOne(id);
    if (!estado) {
      throw new NotFoundException('Estado não encontrado.');
    }
    return estado;
  }

  async update(id: number, updateEstadoDto: UpdateEstadoDto): Promise<EstadoEntity> {
    try {
      const updatedEstado = await this.repository.update(id, updateEstadoDto);
      return updatedEstado;
    } catch (error) {
      // Trate o erro adequadamente, talvez com um logger ou outra ação apropriada.
      throw new Error('Erro ao atualizar o estado.');
    }
  }

  async remove(id: number): Promise<EstadoEntity> {
    try {
      const deletedEstado = await this.repository.remove(id);
      if (!deletedEstado) {
        throw new NotFoundException('Estado não encontrado para exclusão.');
      }
      return deletedEstado;
    } catch (error) {
      // Trate o erro adequadamente, talvez com um logger ou outra ação apropriada.
      throw new Error('Erro ao remover o estado.');
    }
  }
}

// import { Injectable } from '@nestjs/common';
// import { CreateEstadoDto } from './dto/create-estado.dto';
// import { UpdateEstadoDto } from './dto/update-estado.dto';
// import { EstadoRepository } from './repositories/estado.repository';
// import { EstadoEntity } from './entities/estado.entity';
// import { NotFoundError } from 'src/common/errors/types/NotFoundError';

// @Injectable()
// export class EstadoService {
//   constructor(private readonly repository: EstadoRepository) {}

//   async create(createEstadoDto: CreateEstadoDto): Promise<EstadoEntity> {
//     const createEstado = await this.repository.create({
//       ...createEstadoDto,
//     });
//     return {
//       ...createEstado,
//     };
//   }

//   findAll() {
//     return this.repository.findAll();
//   }
//   async findOne(id: number) {
//     const cidade = await this.repository.findOne(id);

//     if (!cidade) {
//       throw new NotFoundError('Cidade não encontrado.');
//     }

//     return cidade;
//   }

//   update(id: number, updateEstadoDto: UpdateEstadoDto) {
//     return this.repository.update(id, updateEstadoDto);
//   }

//   remove(id: number) {
//     return this.repository.remove(id);
//   }
// }
