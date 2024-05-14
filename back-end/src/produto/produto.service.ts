import { Injectable } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { ProdutoRepository } from './repositories/produto.repository';
import { ProdutoEntity } from './entities/produto.entity';
import { NotFoundException } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Injectable()
export class ProdutoService {
  constructor(private readonly repository: ProdutoRepository) {}

  async create(createProdutoDto: CreateProdutoDto, currentUser): Promise<ProdutoEntity> {
    try {
      const createdProduto = await this.repository.create(createProdutoDto, currentUser);
      return createdProduto;
    } catch (error) {
      // Lógica para lidar com erros de criação do produto
      throw new Error('Erro ao criar o produto. Detalhes: ' + error.message);
    }
  }

  async findAll(currentUser): Promise<ProdutoEntity[]> {
    try {
      return await this.repository.findAll(currentUser);
    } catch (error) {
      // Lógica para lidar com erros ao buscar todos os produtos
      throw new Error('Erro ao buscar todos os produtos. Detalhes: ' + error.message);
    }
  }

  async findOneProdutoCompany(idempresa:number, idproduto:number, idestado:number, idcidade:number): Promise<any[]> {
    const produto = await this.repository.findOneProdutoCompany(idempresa, idproduto, idestado, idcidade);
    if (!produto) {
      throw new NotFoundException(`Lead with id ${idempresa} not found`);
    }

    return produto;
  }

  async findOne(id: number): Promise<ProdutoEntity> {
    try {
      const produto = await this.repository.findOne(id);
      if (!produto) {
        throw new NotFoundException('Produto não encontrado.');
      }
      return produto;
    } catch (error) {
      // Lógica para lidar com erros ao buscar um produto específico
      throw new Error('Erro ao buscar o produto. Detalhes: ' + error.message);
    }
  }

  async update(idproduto: number, updateProdutoDto: UpdateProdutoDto, currentUser): Promise<ProdutoEntity> {
    try {
      return await this.repository.update(idproduto, updateProdutoDto, currentUser);
    } catch (error) {
      // Lógica para lidar com erros ao atualizar um produto
      throw new Error('Erro ao atualizar o produto. Detalhes: ' + error.message);
    }
  }

  async remove(idproduto: number): Promise<ProdutoEntity> {
    try {
      return await this.repository.remove(idproduto);
    } catch (error) {
      // Lógica para lidar com erros ao remover um produto
      throw new Error('Erro ao remover o produto. Detalhes: ' + error.message);
    }
  }
}
