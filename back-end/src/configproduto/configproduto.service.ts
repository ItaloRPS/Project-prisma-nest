import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateConfigprodutoDto } from './dto/create-configproduto.dto';
import { UpdateConfigprodutoDto } from './dto/update-configproduto.dto';
import { ConfigProdutoRepository } from './repositories/configProduto.repository';
import { ConfigprodutoEntity } from './entities/configproduto.entity';

@Injectable()
export class ConfigprodutoService {
  constructor(private readonly repository: ConfigProdutoRepository) {}

  async create(createConfigprodutoDto: CreateConfigprodutoDto): Promise<ConfigprodutoEntity> {
    const createdConfigProduto = await this.repository.create(createConfigprodutoDto);
    return { ...createdConfigProduto };
  }

  async findAll(): Promise<ConfigprodutoEntity[]> {
    return this.repository.findAll();
  }

  async findOne(id: number): Promise<ConfigprodutoEntity> {
    const configProduto = await this.repository.findOne(id);
    if (!configProduto) {
      throw new NotFoundException('Configuração de produto não encontrada.');
    }
    return configProduto;
  }

  async update(id: number, updateConfigprodutoDto: UpdateConfigprodutoDto): Promise<ConfigprodutoEntity> {
    return this.repository.update(id, updateConfigprodutoDto);
  }

  async remove(idconfigproduto: number){
    return this.repository.remove(idconfigproduto);
  }
  
}

// import { Injectable } from '@nestjs/common';
// import { CreateConfigprodutoDto } from './dto/create-configproduto.dto';
// import { UpdateConfigprodutoDto } from './dto/update-configproduto.dto';
// import { ConfigProdutoRepository } from './repositories/configProduto.repository';
// import { NotFoundError } from 'src/common/errors/types/NotFoundError';
// import { ConfigprodutoEntity } from './entities/configproduto.entity';

// @Injectable()
// export class ConfigprodutoService {
//   constructor(private readonly repository: ConfigProdutoRepository) {}

//   async create(
//     createConfigprodutoDto: CreateConfigprodutoDto,
//   ): Promise<ConfigprodutoEntity> {
//     const createConfigProduto = await this.repository.create({
//       ...createConfigprodutoDto,
//     });
//     return {
//       ...createConfigProduto,
//     };
//   }

//   findAll() {
//     return this.repository.findAll();
//   }
//   async findOne(id: number) {
//     const configProduto = await this.repository.findOne(id);

//     if (!configProduto) {
//       throw new NotFoundError('Configuração de produto não encontrado.');
//     }

//     return configProduto;
//   }

//   update(id: number, updateEmpresaDto: UpdateConfigprodutoDto) {
//     return this.repository.update(id, updateEmpresaDto);
//   }

//   remove(id: number) {
//     return this.repository.remove(id);
//   }
// }
