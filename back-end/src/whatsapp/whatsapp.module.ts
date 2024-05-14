import { Module } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { WhatsappController } from './whatsapp.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { WhatsappRepository } from './repositories/whatsapp.repository'

@Module({
  imports:[PrismaModule],
  controllers: [WhatsappController],
  providers: [WhatsappService,PrismaService,WhatsappRepository],
  exports:[WhatsappService]
})
export class WhatsappModule {}
