import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { EmpresaRepository } from './repositories/empresa.repository';
import { EmpresaEntity } from './entities/empresa.entity';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class EmpresaService {
  constructor(private readonly repository: EmpresaRepository) {}

  async create(createEmpresaDto: CreateEmpresaDto): Promise<EmpresaEntity> {
    try {
      const createdProduto = await this.repository.create(createEmpresaDto);
      return createdProduto;
    } catch (error) {
      // Lógica para lidar com erros de criação do produto
      throw ('Erro ao criar o empresa. Detalhes: ' + error.message);
    }
  }

  async findAll(currentUser): Promise<EmpresaEntity[]> {
    try {
      const empresas = await this.repository.findAll(currentUser);
      return empresas;
    } catch (error) {
      throw new Error('Erro ao buscar todas as empresas');
    }
  }

  async findOne(idempresa: number): Promise<EmpresaEntity> {
    const empresa = await this.repository.findOne(idempresa);

    if (!empresa) {
      throw new NotFoundException('Empresa não encontrada');
    }

    return empresa;
  }

  async update(idempresa: number, updateEmpresaDto: UpdateEmpresaDto): Promise<EmpresaEntity> {
    try {
      const updatedEmpresa = await this.repository.update(idempresa, updateEmpresaDto);
      return updatedEmpresa;
    } catch (error) {
      throw new Error('Erro ao atualizar empresa');
    }
  }

  async remove(idempresa: number): Promise<void> {
    try {
      const deletedEmpresa = await this.repository.remove(idempresa);
      if (!deletedEmpresa) {
        throw new NotFoundException('Empresa não encontrada para exclusão');
      }
    } catch (error) {
      throw new Error('Erro ao remover empresa');
    }
  }

  async findAllByUser(idusuario: number): Promise<UserEntity> {
      const empresa = await this.repository.findAllByUser(idusuario);
      if (!empresa) {
        throw new NotFoundException('Empresas não encontradas');
      }
    return empresa;
    }

}
