import { Injectable } from '@nestjs/common';
import { CreatePaisDto } from './dto/create-pais.dto';
import { UpdatePaisDto } from './dto/update-pais.dto';
import { PaisRepository } from './repositories/pais.repository';
import { PaisEntity } from './entities/pais.entity';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';

@Injectable()
export class PaisService {
  constructor(private readonly repository: PaisRepository) {}

  async create(createPaisDto: CreatePaisDto): Promise<PaisEntity> {
    const createPais = await this.repository.create({
      ...createPaisDto,
    });
    return {
      ...createPais,
    };
  }

  findAll() {
    return this.repository.findAll();
  }

  async findOne(id: number) {
    const pais = await this.repository.findOne(id);

    if (!pais) {
      throw new NotFoundError('Pais não encontrado.');
    }

    return pais;
  }

  update(id: number, updatePaisDto: UpdatePaisDto) {
    return this.repository.update(id, updatePaisDto);
  }

  remove(id: number) {
    return this.repository.remove(id);
  }
}

// import { Injectable } from '@nestjs/common';
// import { CreatePaisDto } from './dto/create-pais.dto';
// import { UpdatePaisDto } from './dto/update-pais.dto';
// import { PaisRepository } from './repositories/pais.repository';
// import { PaisEntity } from './entities/pais.entity';
// import { NotFoundError } from 'src/common/errors/types/NotFoundError';

// @Injectable()
// export class PaisService {
//   constructor(private readonly repository: PaisRepository) {}

//   async create(createPaisDto: CreatePaisDto): Promise<PaisEntity> {
//     const createPais = await this.repository.create({
//       ...createPaisDto,
//     });
//     return {
//       ...createPais,
//     };
//   }

//   findAll() {
//     return this.repository.findAll();
//   }
//   async findOne(id: number) {
//     const cidade = await this.repository.findOne(id);

//     if (!cidade) {
//       throw new NotFoundError('Pais não encontrado.');
//     }

//     return cidade;
//   }

//   update(id: number, updatePaisDto: UpdatePaisDto) {
//     return this.repository.update(id, updatePaisDto);
//   }

//   remove(id: number) {
//     return this.repository.remove(id);
//   }
// }
