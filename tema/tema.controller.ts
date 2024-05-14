import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, HttpException } from '@nestjs/common';
import { TemaService } from './tema.service';
import { CreateTemaDto } from './dto/create-tema.dto';
import { UpdateTemaDto } from './dto/update-tema.dto';
import { ApiTags, ApiResponse, ApiBadRequestResponse, ApiOkResponse } from '@nestjs/swagger';
import { NotFoundException } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UserEntity } from 'src/user/entities/user.entity';

@ApiTags('Tema')
@Controller('/api/v1/tema')
export class TemaController {
  constructor(private readonly temaService: TemaService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() CreateTemaDto: CreateTemaDto, @CurrentUser() currentUser: UserEntity) {
    try {
      const retorno = await this.temaService.create(CreateTemaDto, currentUser.name);
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
      const retorno = await this.temaService.findAll();
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

  @Get("/temaDefault")
  async findAlltemaDefault( @CurrentUser() currentUser: UserEntity) {
    try {
      const retorno = await this.temaService.findAlltemaDefault(currentUser);
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
      const retorno = await this.temaService.findOne(+id);
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
  async update(@Param('id') id: string, @Body() updateTemaDto: UpdateTemaDto, @CurrentUser() currentUser: UserEntity) {
    try {
      const retorno = await this.temaService.update(+id, updateTemaDto, currentUser.name);
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

  @Patch('/updateItem/:id')
  async updateTemaItem(@Param('id') id: string, @Body() updateTemaDto: any, @CurrentUser() currentUser: UserEntity) {
    try {
      const retorno = await this.temaService.updateTemaItem(+id, updateTemaDto, currentUser.name);
      return {
        message: 'sucesso',
        result: retorno
      };
    } catch (error) {
      // Tratamento de erro apropriado
      // throw new NotFoundException(error);
      return {
        message: 'erro',
        error: error.message,
      };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const retorno = await this.temaService.remove(+id);
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
