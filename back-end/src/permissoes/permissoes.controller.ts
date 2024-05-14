/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { PermissoesService } from './permissoes.service';
import { CreatePermissoeDto } from './dto/create-permissoe.dto';
import { UpdatePermissoeDto } from './dto/update-permissoe.dto';
import { ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UserEntity } from 'src/user/entities/user.entity';

@ApiTags('Permissoes')
@Controller('/api/v1/permissoes')
export class PermissoesController {
  constructor(private readonly permissoesService: PermissoesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createPermissoeDto: CreatePermissoeDto) {
    try {
      const retorno = await this.permissoesService.create(createPermissoeDto);
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

  // Rota para obter as permissões de rotas do usuário atual
  @Get('/rotas')
  async getMe(@CurrentUser() currentUser: UserEntity) {
    try {
      const retorno = await this.permissoesService.findPermissionsRotas(currentUser);
      if (!retorno) {
        throw new NotFoundException('Permissões não encontradas');
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

  @Get()
  async findAll() {
    try {
      const retorno = await this.permissoesService.findAll();
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
      const retorno = await this.permissoesService.findOne(+id);
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
  async update(@Param('id') id: string, @Body() updatePermissoeDto: UpdatePermissoeDto) {
    try {
      const retorno = await this.permissoesService.update(+id, updatePermissoeDto);
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
      const retorno = await this.permissoesService.remove(+id);
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
