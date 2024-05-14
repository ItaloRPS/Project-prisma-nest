import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, NotFoundException } from '@nestjs/common';
import { ConfigprodutoService } from './configproduto.service';
import { CreateConfigprodutoDto } from './dto/create-configproduto.dto';
import { UpdateConfigprodutoDto } from './dto/update-configproduto.dto';
import { ApiTags, ApiResponse, ApiBadRequestResponse, ApiOkResponse } from '@nestjs/swagger';

@ApiTags('Config Produto')
@Controller('/api/v1/configproduto')
export class ConfigprodutoController {
  constructor(private readonly configprodutoService: ConfigprodutoService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createConfigprodutoDto: CreateConfigprodutoDto) {
    try {
      const retorno = await this.configprodutoService.create(createConfigprodutoDto);
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
      const retorno = await this.configprodutoService.findAll();
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
      const retorno = await this.configprodutoService.findOne(+id);
      if (!retorno) {
        throw new NotFoundException('Registro não encontrada');
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
  async update(@Param('id') id: string, @Body() updateConfigprodutoDto: UpdateConfigprodutoDto) {
    try {
      const retorno = await this.configprodutoService.update(+id, updateConfigprodutoDto);
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
      const retorno = await this.configprodutoService.remove(+id);
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