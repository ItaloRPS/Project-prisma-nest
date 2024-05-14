import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';
import { CidadeService } from './cidade.service';
import { CreateCidadeDto } from './dto/create-cidade.dto';
import { UpdateCidadeDto } from './dto/update-cidade.dto';
import {
  ApiTags,
} from '@nestjs/swagger';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@ApiTags('Cidade')
@Controller('/api/v1/cidade')
export class CidadeController {
  constructor(private readonly cidadeService: CidadeService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createCidadeDto: CreateCidadeDto) {
    try {
      const retorno = await this.cidadeService.create(createCidadeDto);
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
  @Get()
  async findAll() {
    try {
      const retorno = await this.cidadeService.findAll();
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
      const retorno = await this.cidadeService.findOne(+id);
      if (!retorno) {
        throw new NotFoundException('Registro não encontrada.');
      }
      return {
        message: 'sucesso',
        result: retorno,
      };
    } catch (error) {
      return {
        message: 'erro',
        error: error.message,
      };
    }
  }

  @Get('cidadeAll/:id')
  async findOneEstado(@Param('id') id: string) {
    try {
      const retorno = await this.cidadeService.findOneEstado(+id);
      if (!retorno) {
        throw new NotFoundException('Registro não encontrada.');
      }
      return {
        message: 'sucesso',
        result: retorno,
      };
    } catch (error) {
      return {
        message: 'erro',
        error: error.message,
      };
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCidadeDto: UpdateCidadeDto,
  ) {
    try {
      const retorno = await this.cidadeService.update(+id, updateCidadeDto);
      return {
        message: 'sucesso',
        result: retorno
      };
    } catch (error) {
      return {
        message: 'erro',
        error: error.message,
      };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const retorno = await this.cidadeService.remove(+id);
      return {
        message: 'sucesso',
        result: retorno
      };
    } catch (error) {
      return {
        message: 'erro',
        error: error.message,
      };
    }
  }
}
