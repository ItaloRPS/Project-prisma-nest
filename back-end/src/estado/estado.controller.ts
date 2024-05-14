import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, HttpCode, HttpStatus } from '@nestjs/common';
import { EstadoService } from './estado.service';
import { CreateEstadoDto } from './dto/create-estado.dto';
import { UpdateEstadoDto } from './dto/update-estado.dto';
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@ApiTags('Estado')
@Controller('/api/v1/estado')
export class EstadoController {
  constructor(private readonly estadoService: EstadoService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createEstadoDto: CreateEstadoDto) {
    try {
      const retorno = await this.estadoService.create(createEstadoDto);
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
  @Get(':idpais')
  async findAll(@Param('idpais') idpais: string) {
    try {
      const retorno = await this.estadoService.findAll(+idpais);
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
      const retorno = await this.estadoService.findOne(+id);
      if (!retorno) {
        throw new NotFoundException('retorno não encontrado');
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
  async update(@Param('id') id: string, @Body() createEstadoDto: CreateEstadoDto) {
    try {
      const retorno = await this.estadoService.update(+id, createEstadoDto);
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
      const retorno = await this.estadoService.remove(+id);
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
