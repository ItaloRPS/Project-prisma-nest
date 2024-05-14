import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException, NotFoundException, HttpCode } from '@nestjs/common';
import { EmpresaService } from './empresa.service';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { EmpresaEntity } from './entities/empresa.entity';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UserEntity } from 'src/user/entities/user.entity';

@ApiTags('Empresa')
@Controller('api/v1/empresa')
export class EmpresaController {
  constructor(private readonly empresaService: EmpresaService) {}

  @IsPublic()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createEmpresaDto: CreateEmpresaDto) {
    try {
      const retorno = await this.empresaService.create(createEmpresaDto);
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

  @Get('user/:id')
  async findAllByUser(@Param('id') id: string) {
    try {
      const retorno = await this.empresaService.findAllByUser(+id);
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

  @Get()
  async findAll(@CurrentUser() currentUser:UserEntity) {
    try {
      const retorno = await this.empresaService.findAll(currentUser);
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
      const retorno = await this.empresaService.findOne(+id);
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
  async update(@Param('id') id: string, @Body() updateEmpresaDto: UpdateEmpresaDto) {
    try {
      const retorno = await this.empresaService.update(+id, updateEmpresaDto);
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
      const retorno = await this.empresaService.remove(+id);
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