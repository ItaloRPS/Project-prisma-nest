import { Module } from '@nestjs/common';
import { TemaService } from './tema.service';
import { TemaController } from './tema.controller';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TemaRepository } from './repositories/tema.repository';

@Module({
  imports: [PrismaModule],
  controllers: [TemaController],
  providers: [TemaService, PrismaService, TemaRepository],
  exports: [TemaService],
})
export class TemaModule {}
