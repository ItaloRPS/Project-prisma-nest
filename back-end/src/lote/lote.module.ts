import { Module } from '@nestjs/common';
import { LoteService } from './lote.service';
import { LoteController } from './lote.controller';
import { LoteRepository } from './repositories/lote.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [LoteController],
  providers: [LoteService,PrismaService,LoteRepository],
  exports: [LoteService],
})
export class LoteModule {}
