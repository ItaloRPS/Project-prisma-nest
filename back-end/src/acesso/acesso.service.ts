import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAcessoDto } from './dto/create-acesso.dto';
import { UpdateAcessoDto } from './dto/update-acesso.dto';
import { AcessoRepository } from './repositories/acesso.repository';
import { AcessoEntity } from './entities/acesso.entity';

@Injectable()
export class AcessoService {
  constructor(private readonly repository: AcessoRepository) {}

  async create(createAcessoDto: CreateAcessoDto): Promise<AcessoEntity> {
    const createdAcesso = await this.repository.create(createAcessoDto);
    return { ...createdAcesso };
  }

  async createMany(acessos: []) {
    return await this.repository.createMany(acessos);
  }

  async findAll(): Promise<AcessoEntity[]> {
    return await this.repository.findAll();
  }

  async findOne(id: number): Promise<AcessoEntity> {
    const acesso = await this.repository.findOne(id);
    if (!acesso) {
      throw new NotFoundException('Acesso não encontrado.');
    }
    return acesso;
  }

  async findAcessoURL(hash: string) {
    const acesso = await this.repository.findAcessoURL(hash);
    let retorno;



    if (!acesso) {
      throw new NotFoundException('Acesso não encontrado.');
    } else {
      if (acesso.lote.produto.editatemplate === 1) {
        
        // console.log("Data update")
        // console.log(acesso?.tema[0]?.updated_at)

        if (acesso.tema[0].updated_at != null) {
          delete acesso.lote.tema;
          retorno = acesso;
          
        } else {
          acesso.tema = acesso.lote.tema;
          delete acesso.lote.tema;
          retorno = acesso;
          
        }
      } else if (acesso.lote.produto.editatemplate === 0) {
        acesso.tema = acesso.lote.tema;
        delete acesso.lote.tema;
        retorno = acesso;
      } else {
        throw new NotFoundException('Erro ao buscar o acesso.');
      }
    }

    return retorno;
  }

  async update(
    id: number,
    updateAcessoDto: UpdateAcessoDto,
  ): Promise<AcessoEntity> {
    const updatedAcesso = await this.repository.update(id, updateAcessoDto);
    return { ...updatedAcesso };
  }

  async remove(id: number) {
    return this.repository.remove(id);
  }
}
