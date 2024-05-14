import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEmpresaDto } from '../dto/create-empresa.dto';
import { EmpresaEntity } from '../entities/empresa.entity';
import { UpdateEmpresaDto } from '../dto/update-empresa.dto';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class EmpresaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createEmpresaDto: CreateEmpresaDto): Promise<EmpresaEntity> {
    try {
      return await this.prisma.empresa.create({
        data: createEmpresaDto,
      });
    } catch (error) {
      throw (`Erro ao criar empresa: ${error.message}`);
    }
  }

  async findAll(currentUser): Promise<EmpresaEntity[]> {
    try {    
      const { id, idempresa, perfil } = currentUser;
      if (perfil.nome === 'Admin') {
        return await this.prisma.empresa.findMany();

      } else if (perfil.nome === 'Lojista' || perfil.nome === 'Empresa') {
        return await this.prisma.empresa.findMany({
          where:{
            idempresa:{
              in:idempresa
            }
          }
        });
      }

    } catch (error) {
      console.error('Ocorreu um erro ao executar a busca dos leads:', error);
    }
  }

  async findOne(idempresa: number): Promise<EmpresaEntity> {
    const empresa = await this.prisma.empresa.findUnique({
      where: {
        idempresa,
      },
      include: {
        pais: true,
        estado: true,
        cidade: true,
      },
    });

    if (!empresa) {
      throw new NotFoundException('Empresa não encontrada');
    }

    return empresa;
  }
  async findAllByUser(idusuario: number): Promise<UserEntity> {
    const empresas = await this.prisma.user.findUnique({
      where: {
        id:idusuario,
      },
      include: {
        UserEmpresa:{include:{empresa:true}}
      },
    });

    if (!empresas) {
      throw new NotFoundException('Empresas não encontradas');
    }

    return empresas;
  }

  async update(idempresa: number, updateEmpresaDto: UpdateEmpresaDto): Promise<EmpresaEntity> {
    try {
      return await this.prisma.empresa.update({
        where: {
          idempresa,
        },
        data: updateEmpresaDto,
      });
    } catch (error) {
      throw new Error('Erro ao atualizar empresa');
    }
  }

  async remove(idempresa: number): Promise<EmpresaEntity> {
    try {
      const deletedEmpresa = await this.prisma.empresa.delete({
        where: {
          idempresa,
        },
      });

      if (!deletedEmpresa) {
        throw new NotFoundException('Empresa não encontrada para exclusão');
      }

      return deletedEmpresa;
    } catch (error) {
      throw new Error('Erro ao remover empresa');
    }
  }
}
