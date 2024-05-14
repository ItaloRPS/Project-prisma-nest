import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode, NotFoundException } from '@nestjs/common';
import { TemaItemService } from './tema-item.service';
import { CreateTemaItemDto } from './dto/create-tema-item.dto';
import { UpdateTemaItemDto } from './dto/update-tema-item.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('Tema Item')
@Controller('/api/v1/temaitem')
export class TemaItemController {
  constructor(private readonly temaItemService: TemaItemService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTemaItemDto: CreateTemaItemDto) {
    try {
      const retorno = await this.temaItemService.create(createTemaItemDto);
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
      const retorno = await this.temaItemService.findAll();
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
      const retorno = await this.temaItemService.findOne(+id);
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
  async update(@Param('id') id: string, @Body() updateTemaItemDto: UpdateTemaItemDto) {
    try {
      const retorno = await this.temaItemService.update(+id, updateTemaItemDto);
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
      const retorno = await this.temaItemService.remove(+id);
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
