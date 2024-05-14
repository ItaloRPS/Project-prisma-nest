import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { CreateWhatsappDto } from './dto/create-whatsapp.dto';
import { UpdateWhatsappDto } from './dto/update-whatsapp.dto';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UserEntity } from 'src/user/entities/user.entity';

@ApiTags('Whatsapp')
@Controller('/api/v1/whatsapp')
@Controller('whatsapp')
export class WhatsappController {
  constructor(private readonly whatsappService: WhatsappService) {}


  @Post()
  create(@Body() createWhatsappDto: CreateWhatsappDto,@CurrentUser() currentUser) {
    return this.whatsappService.create(createWhatsappDto,currentUser.name);
  }

  @Get('/company/:id')
  findAllByCompany(@Param('id')idempresa:number) {
    return this.whatsappService.findAllByCompany(+idempresa);
  }
  @Get('drcode')
  findQrCode( @Query('session') session:string,@Query('sessionkey') sessionkey:string) {
    return this.whatsappService.getQrCode({session, sessionkey});
  }

  @Get()
  findAll(@CurrentUser() currentUser: UserEntity) {
    return this.whatsappService.findAll(currentUser);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.whatsappService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWhatsappDto: UpdateWhatsappDto,@CurrentUser() currentUser) {
    return this.whatsappService.update(+id, updateWhatsappDto,currentUser.name);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.whatsappService.remove(+id);
  }
}
