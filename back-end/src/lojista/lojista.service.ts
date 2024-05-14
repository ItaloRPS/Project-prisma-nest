import { Injectable } from '@nestjs/common';
import { CreateLojistaDto } from './dto/create-lojista.dto';
import { UpdateLojistaDto } from './dto/update-lojista.dto';
import { LojistaRepository } from './repositories/lojista.repository';

@Injectable()
export class LojistaService {
constructor(private readonly lojistaRepository: LojistaRepository){}

  create(createLojistaDto: CreateLojistaDto[]) {
    const lojistas = Promise.all(
      createLojistaDto.map(lojista=>this.lojistaRepository.create(lojista))
  )
    return lojistas;
  }

  findAll(currentUser, empresa:number) {
    return this.lojistaRepository.findAll(currentUser, empresa);
  }

  findOneFilter(idestado: number, idcidade: number, idempresa: number) {
    return this.lojistaRepository.findOneFilter(idestado, idcidade, idempresa);
  }

  findOne(id: number) {
    return this.lojistaRepository.findOne(id);
  }

  findAllUserShopkeeper() {
    return this.lojistaRepository.findAllUserShopkeeper();
  }

  update(id: number, updateLojistaDto: UpdateLojistaDto) {
    return this.lojistaRepository.update(id,updateLojistaDto);
  }

  remove(id: number) {
    return this.lojistaRepository.remove(id);
  }
}
