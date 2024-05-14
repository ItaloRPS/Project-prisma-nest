import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLoteDto } from './dto/create-lote.dto';
import { UpdateLoteDto } from './dto/update-lote.dto';
import { LoteRepository } from './repositories/lote.repository';
import { LoteEntity } from './entities/lote.entity';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LoteService {
  constructor(private readonly repository: LoteRepository) {}

  async create(createLoteDto: CreateLoteDto): Promise<LoteEntity> {
    // Adicionar validações e lógica de verificação, se necessário

    const createLote = await this.repository.create({
      ...createLoteDto,
    });

    return {
      ...createLote,
    };
  }

  async aprove(idlote: number, updateLoteDto: UpdateLoteDto, currentUser: string) {
    try {
      const arrayAcesso = [];
      const lote = await this.repository.findOne(idlote);
      // console.log(`quantidade: ${lote.quantidade}`);
      // console.log(`idlote: ${lote.idlote}`);
      // console.log(`idproduto: ${lote.idproduto}`);
      // console.log(`idtemplate: ${lote.idtemplate}`);

      for (let i = 0; i < lote.quantidade; i++) {
        let hash = btoa(
          `${lote.idlote + lote.idproduto + lote.idtemplate}${Math.random()}`,
          // `${updateLoteDto.idlote}${updateLoteDto.idproduto}${updateLoteDto.idtemplate}${Math.random()}${new Date()}`
        );
        arrayAcesso.push({
          idlote,
          link: 'https://app.multleads.com.br/cadastro/' + hash,
          hash,
        });
      }

      return await this.repository.aprove(idlote, updateLoteDto, arrayAcesso, currentUser);
    } catch (error) {
      // Lógica de tratamento de erros personalizada, se necessário
      throw new Error('Erro ao aprovar lote: ' + error.message);
    }
  }

  // async aprove(idlote: number, updateLoteDto: UpdateLoteDto, currentUser: string) {
  //   try {
  //     const lote = await this.repository.findOne(idlote);
  //     const arrayAcesso = Array.from({ length: lote.quantidade }, () => {
  //       const hash = uuidv4(); // Usando uuidv4 para garantir unicidade

  //       return {
  //         idlote,
  //         link: `https://app.multleads.com.br/cadastro/${hash}`,
  //         hash,
  //       };
  //     });

  //     return await this.repository.aprove(idlote, updateLoteDto, arrayAcesso, currentUser);
  //   } catch (error) {
  //     // Lógica de tratamento de erros personalizada, se necessário
  //     throw new Error('Erro ao aprovar lote: ' + error.message);
  //   }
  // }

  findAll(currentUser) {
    // Adicionar lógica adicional, se necessário
    return this.repository.findAll(currentUser);
  }

  async findOne(idlote: number, hash: string) {
    let lote;

    if (hash) {
      // console.log("findOneHash")
      lote = await this.repository.findOneHash(idlote, hash);
    } else {

      // console.log("findOne")
      lote = await this.repository.findOne(idlote);
    }

    if (!lote) {
      throw new NotFoundError('Lote não encontrado.');

    } else if (lote.produto.editatemplate == 1) {
      
      if (Object.keys(hash).length === 0) {

      } else {
        lote.tema = lote.acesso[0].tema;
        lote.lead = lote.acesso[0]?.lead;
        delete lote.acesso;
      }

    } else if (lote.produto.editatemplate == 0) {
      lote.lead = lote.acesso[0]?.lead;
      delete lote.acesso;
      // console.log(lote)
      
    } else {
      throw new NotFoundError('Lote não encontrado.');
    }

    return lote;
  }

  async downloadLink(id: number): Promise<LoteEntity> {
    const lote = await this.repository.downloadLink(id);
    if (!lote) {
      throw new NotFoundException('Link não encontrado.');
    }
    return lote;
  }

  update(idlote: number, updateLoteDto: UpdateLoteDto) {
    // Adicionar lógica adicional de atualização, se necessário
    return this.repository.update(idlote, updateLoteDto);
  }

  remove(idlote: number) {
    // Adicionar lógica adicional de remoção, se necessário
    return this.repository.remove(idlote);
  }
}
