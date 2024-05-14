/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, HttpCode, NotFoundException, Query } from '@nestjs/common';
import { LeadService } from './lead.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserEntity } from 'src/user/entities/user.entity';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@ApiTags('Lead')
@Controller('/api/v1/lead')
export class LeadController {
  constructor(private readonly leadService: LeadService) {}

  @Post('/vincularLead')
  @HttpCode(HttpStatus.CREATED)
  async findOneEmail(@Body() vinculaLead) {    
    try {
      const retorno = await this.leadService.findOneEmail(vinculaLead.email, vinculaLead.hash);
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

  // @Post()
  // @HttpCode(HttpStatus.CREATED)
  // async create(@Body() createLeadDto: CreateLeadDto) {
  //   try {
  //     const retorno = await this.leadService.create(createLeadDto);
  //     return {
  //       message: 'sucesso',
  //       result: retorno,
  //     };
  //   } catch (error) {
  //     // Tratamento de erro apropriado
  //     return {
  //       message: 'erro',
  //       error: error.message,
  //     };
  //   }
  // }

  @Get()
  async findAll(@CurrentUser() currentUser: UserEntity) {
    try {
      const retorno = await this.leadService.findAll(currentUser);
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

  @Get('/company/download/:idempresa')
  async findOneCompanyDownload(@Param('idempresa') idempresa: string, @CurrentUser() currentUser:UserEntity) {
    try {
      const retorno = await this.leadService.findOneCompanyDownload(+idempresa,currentUser);
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

  @Get('/company/:idempresa')
  async findOneCompany(@Param('idempresa') idempresa: string, @CurrentUser() currentUser:UserEntity) {
    try {
      const retorno = await this.leadService.findOneCompany(+idempresa,currentUser);
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
  
  @Get('/lote/:idlote')
  async findAllbyLote(@Param('idlote')idlote: string, @Query('idestado')idestado:string, @Query('idcidade')idcidade:string) {
    try {
      const retorno = await this.leadService.findAllbyLote(+idlote, +idestado, +idcidade);
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

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    // console.log("id")
    // console.log(id)
    try {
      const retorno = await this.leadService.findOne(+id);
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
  async update(@Param('id') id: string, @Body() updateLeadDto: UpdateLeadDto) {
    try {
      const retorno = await this.leadService.update(+id, updateLeadDto);
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

  @Delete('removeEmail')
  async removeEmail(@Query('email') email: string) {
    try {
      const retorno = await this.leadService.removeEmail(email);
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

  @Delete('removeHash')
  async removeHash(@Query('hash') hash: string) {
    try {
      const retorno = await this.leadService.removeHash(hash);
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

  @Delete('deleteaccess')
  async clearAccess(@Query('hash') hash: string) {
    try {
      const retorno = await this.leadService.clearAccess(hash);
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

  // @Delete(':id')
  // async remove(@Param('id') id: string) {
  //   try {
  //     const retorno = await this.leadService.remove(+id);
  //     return {
  //       message: 'sucesso',
  //       result: retorno
  //     };
  //   } catch (error) {
  //     // Tratamento de erro apropriado
  //     return {
  //       message: 'erro',
  //       error: error.message,
  //     };
  //   }
  // }
}
