/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, HttpCode, NotFoundException, Query } from '@nestjs/common';
import { LoteService } from './lote.service';
import { CreateLoteDto } from './dto/create-lote.dto';
import { UpdateLoteDto } from './dto/update-lote.dto';
import { ApiTags } from '@nestjs/swagger';
import { hash } from 'bcrypt';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UserEntity } from 'src/user/entities/user.entity';

@ApiTags('Lote')
@Controller('/api/v1/lote')
@Controller('lote')
export class LoteController {
  constructor(private readonly loteService: LoteService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createLoteDto: CreateLoteDto) {
    try {
      const retorno = await this.loteService.create(createLoteDto);
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

  @Post('/aprovar/:id')
  async aprove(@Param('id') id: string, @Body() updateLoteDto: UpdateLoteDto, @CurrentUser() currentUser: UserEntity) {
    try {
      const retorno = await this.loteService.aprove(+id, updateLoteDto, currentUser.name);
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
  async findAll( @CurrentUser() currentUser: UserEntity) {
    try {
      const retorno = await this.loteService.findAll(currentUser );
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
  async findOne(@Param('id') id: string,  @Query('hash') hash: string) {
    try {
      const retorno = await this.loteService.findOne(+id, hash||'');
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

  @Get('downloadLink/:id')
  async downloadLink(@Param('id') id: string) {
    try {
      const retorno = await this.loteService.downloadLink(+id);
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
  async update(@Param('id') id: string, @Body() updateLoteDto: UpdateLoteDto) {
    try {
      const retorno = await this.loteService.update(+id, updateLoteDto);
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
      const retorno = await this.loteService.remove(+id);
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
