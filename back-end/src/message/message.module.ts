import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { MessageRepository } from './repositories/message.repository'
import { WhatsappService } from '../whatsapp/whatsapp.service'
import { WhatsappRepository } from '../whatsapp/repositories/whatsapp.repository'

@Module({
  imports:[PrismaModule],
  controllers: [MessageController],
  providers: [MessageService, PrismaService, MessageRepository,WhatsappService,WhatsappRepository],
  exports:[MessageService, WhatsappService],
})
export class MessageModule {}
