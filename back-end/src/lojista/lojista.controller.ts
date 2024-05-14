import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { LojistaService } from './lojista.service';
import { CreateLojistaDto } from './dto/create-lojista.dto';
import { UpdateLojistaDto } from './dto/update-lojista.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { LojistaEntity } from './entities/lojista.entity';
import { ApiTags } from '@nestjs/swagger';
import { query } from 'express';

@ApiTags('lojista')
@Controller('/api/v1/lojista')
export class LojistaController {
  constructor(private readonly lojistaService: LojistaService) {}

  @Post()
  create(@Body() createLogistaDto: CreateLojistaDto[]) {
    return this.lojistaService.create(createLogistaDto);
  }

  @Get('filter/:idestado/:idcidade/:idempresa')
  findOneFilter(
    @Param('idestado') idestado: string,
    @Param('idcidade') idcidade: string,
    @Param('idempresa') idempresa: string,
  ) {
    return this.lojistaService.findOneFilter(+idestado, +idcidade, +idempresa);
  }

  @Get('/users')
  findAllUserShopkeeper() {
    return this.lojistaService.findAllUserShopkeeper();
  }

  @Get()
  findAll(@CurrentUser() currentUser: LojistaEntity, @Query('idempresa')idempresa:string ) {
    return this.lojistaService.findAll(currentUser, +idempresa);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lojistaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLogistaDto: UpdateLojistaDto) {
    return this.lojistaService.update(+id, updateLogistaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lojistaService.remove(+id);
  }
}
