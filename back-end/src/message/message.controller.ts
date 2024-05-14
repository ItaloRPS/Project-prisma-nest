import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query, NotFoundException } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UserEntity } from 'src/user/entities/user.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Message')
@Controller('/api/v1/message')
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('/sendMessage')
  @HttpCode(HttpStatus.CREATED)
  async sendMessage(@Body() createMessageDto: any) {
    try {
      const retorno = await this.messageService.sendMessages(createMessageDto.idwhatsapp, createMessageDto.fone, createMessageDto.texto);
      return {
        message: 'sucesso',
        result: retorno,
      };
    } catch (error) {
      console.log("error")
      console.log(error)
      // Tratamento de erro apropriado
      return {
        message: 'erro',
        error: error.message,
      };
    }
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createMessageDto: CreateMessageDto, @CurrentUser() currentUser: UserEntity) {
    try {
      const retorno = await this.messageService.create(createMessageDto, currentUser.name);
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

   @Get('leads/:idempresa')
   async findMessagesAndLeads(@Param('idempresa') idempresa:string, @Query('idmensagem')idmensagem:string, @Query('idproduto')idproduto:string,@Query('idestado')idestado:string, @Query('idcidade')idcidade:string) {
    try {
      // const retorno = await this.messageService.findMessagesAndLeads(+idempresa, +idmensagem, +idproduto, +idestado, +idcidade);
      const retorno = await this.messageService.sendMessagesLeads();
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

   @Get('company/:idempresa')
   async findAllByCompany(@Param('idempresa') idempresa:string) {
    try {
      const retorno = await this.messageService.findAllByCompany(+idempresa);
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
  findAll(@CurrentUser() currentUser:UserEntity) {
    return this.messageService.findAll(currentUser);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messageService.update(+id, updateMessageDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.messageService.remove(+id);
  }
}
