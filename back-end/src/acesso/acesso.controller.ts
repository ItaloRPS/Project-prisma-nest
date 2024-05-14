/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ValidationPipe, UsePipes, NotFoundException } from '@nestjs/common';
import { AcessoService } from './acesso.service';
import { CreateAcessoDto } from './dto/create-acesso.dto';
import { UpdateAcessoDto } from './dto/update-acesso.dto';
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@ApiTags('Acesso')
@Controller('/api/v1/acesso')
export class AcessoController {
  constructor(private readonly acessoService: AcessoService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createAcessoDto: CreateAcessoDto) {
    try {
      const retorno = await this.acessoService.create(createAcessoDto);
      return {
        message: 'sucesso',
        result: retorno,
      };
    } catch (error) {
      // Tratamento de erro apropriado
      return {
        message: 'erro',
        error: error.message,
      };
    }
  }

  @Post('/all')
  @HttpCode(HttpStatus.CREATED)
  async createMany(@Body() acessos) {
    try {
      const retorno = await this.acessoService.createMany(acessos);
      return {
        message: 'sucesso',
        result: retorno,
      };
    } catch (error) {
      // Tratamento de erro apropriado
      return {
        message: 'erro',
        error: error.message,
      };
    }
  }

  @Get()
  async findAll() {
    try {
      const retorno = await this.acessoService.findAll();
      if (!retorno) {
        throw new NotFoundException('Registro não encontrado');
      }
      return {
        message: 'sucesso',
        result: retorno,
      };
    } catch (error) {
      // Tratamento de erro apropriado
      return {
        message: 'erro',
        error: error.message,
      };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const retorno = await this.acessoService.findOne(+id);
      if (!retorno) {
        throw new NotFoundException('Registro não encontrado');
      }
      return {
        message: 'sucesso',
        result: retorno,
      };
    } catch (error) {
      // Tratamento de erro apropriado
      return {
        message: 'erro',
        error: error.message,
      };
    }
  }

  @IsPublic()
  @Get('/url/:hash')
  async findAcessoURL(@Param('hash') hash: string) {
    try {
      const retorno = await this.acessoService.findAcessoURL(hash);
      if (!retorno) {
        throw new NotFoundException('Registro não encontrado');
      }
      return {
        message: 'sucesso',
        result: retorno,
      };
    } catch (error) {
      // Tratamento de erro apropriado
      return {
        message: 'erro',
        error: error.message,
      };
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAcessoDto: UpdateAcessoDto) {
    try {
      const retorno = await this.acessoService.update(+id, updateAcessoDto);
      // console.log(retorno, HttpStatus.OK)
      return {
        message: 'sucesso',
        result: retorno
      };
    } catch (error) {
      // Tratamento de erro apropriado
      return {
        message: 'erro',
        error: error.message,
      };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const retorno = await this.acessoService.remove(+id);
      return {
        message: 'sucesso',
        result: retorno
      };
    } catch (error) {
      // Tratamento de erro apropriado
      return {
        message: 'erro',
        error: error.message,
      };
    }
  }
}
