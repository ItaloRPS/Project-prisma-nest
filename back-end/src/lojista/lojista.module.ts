import { Module } from '@nestjs/common';
import { LojistaService } from './lojista.service';
import { LojistaController } from './lojista.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { LojistaRepository } from './repositories/lojista.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [LojistaController],
  providers: [LojistaService, PrismaService, LojistaRepository],
  exports: [LojistaService],
})
export class LojistaModule {}


  