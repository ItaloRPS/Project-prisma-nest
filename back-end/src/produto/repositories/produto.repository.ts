/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProdutoDto } from '../dto/create-produto.dto';
import { ProdutoEntity } from '../entities/produto.entity';
import { UpdateProdutoDto } from '../dto/update-produto.dto';
import { NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProdutoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createProdutoDto: CreateProdutoDto,
    currentUser: string,
  ): Promise<ProdutoEntity> {
    try {
      return await this.prisma.produto.create({
        data: {
          ...createProdutoDto,
          created_at: new Date(),
          created_by: currentUser,
        },
      });
    } catch (error) {
      throw new Error(`Erro ao criar produto: ${error.message}`);
    }
  }

  async findAll(currentUser): Promise<ProdutoEntity[]> {
    try {    
      const { id, idempresa, perfil } = currentUser;
      let produto = []

      if (perfil.nome === 'Admin') {
        produto = await this.prisma.$queryRaw`select * from produto`;

      } else if (perfil.nome === 'Lead') {
        produto = await this.prisma.$queryRaw(Prisma.raw(`select distinct p.*, l.idlote, a.hash
                                              from produto p
                                              inner join lote l on p.idproduto = l.idproduto
                                              inner join acesso a on l.idlote = a.idlote
                                              inner join ${"`lead`"} le on a.idacesso = le.idacesso
                                              where le.idusuario = ${id}`));
        // console.log(produto);

      } else if (perfil.nome === 'Empresa') {
        const query =`select distinct * from produto where idempresa in(${idempresa.toString()})`
        produto = await this.prisma.$queryRaw(Prisma.raw(query));
        // console.log(produto);
      }

      return produto
    } catch (error) {
      console.error('Ocorreu um erro ao executar a busca dos produtos:', error);
    }
  }

  async findOneProdutoCompany(idempresa:number, idproduto:number, idestado:number, idcidade:number): Promise<any> {
    const produto = await this.prisma.$queryRaw(
      Prisma.raw(`
      select prd.idproduto, prd.nome as produto, lt.idlote, lt.codigo as codigoLote, cast(count(le.idlead) as char) as total
      from empresa emp
      inner join produto prd on emp.idempresa = prd.idempresa
      inner join lote lt on prd.idproduto = lt.idproduto
      inner join acesso ac on lt.idlote = ac.idlote
      inner join ${"`lead`"} le on le.idacesso = ac.idacesso
      where emp.idempresa = ${idempresa}
      ${idproduto?` AND lt.idproduto = ${idproduto}`:''}
      ${idestado?` AND le.idestado = ${idestado}`:''}
      ${idcidade?` AND le.idcidade = ${idcidade}`:''}
      GROUP BY prd.idproduto, prd.nome, lt.idlote, lt.codigo
      HAVING total > 0;
      `)
    )
    if (!produto) {
      throw new NotFoundException(`Nenhum Lead encontrado.`);
    }
    return produto;
  }

  async findOne(idproduto: number): Promise<ProdutoEntity> {
    try {
      const produto = await this.prisma.produto.findUnique({
        where: {
          idproduto,
        },
      });
      if (!produto) {
        throw new NotFoundException('Produto não encontrado');
      }
      return produto;
    } catch (error) {
      throw new Error(`Erro ao buscar o produto: ${error.message}`);
    }
  }
  async findAllByCompany(idproduto: number): Promise<ProdutoEntity> {
    try {
      const produto = await this.prisma.produto.findUnique({
        where: {
          idproduto,
        },
      });
      if (!produto) {
        throw new NotFoundException('Produto não encontrado');
      }
      return produto;
    } catch (error) {
      throw new Error(`Erro ao buscar o produto: ${error.message}`);
    }
  }

  async update(idproduto: number, updateProdutoDto: UpdateProdutoDto, currentUser: string ): Promise<ProdutoEntity> {
    try {
      return await this.prisma.produto.update({
        where: {
          idproduto,
        },
        data: {
          ...updateProdutoDto,
          updated_at: new Date(),
          updated_by: currentUser,
        },
      });
    } catch (error) {
      throw new Error(`Erro ao atualizar o produto: ${error.message}`);
    }
  }

  async remove(idproduto: number): Promise<ProdutoEntity> {
    try {
      return await this.prisma.produto.delete({
        where: {
          idproduto,
        },
      });
    } catch (error) {
      throw new Error(`Erro ao remover o produto: ${error.message}`);
    }
  }
}
