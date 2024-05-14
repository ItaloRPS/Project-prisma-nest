import { Module } from '@nestjs/common';
import { ModeloService } from './modelo.service';
import { ModeloController } from './modelo.controller';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ModeloRepository } from './repositories/modelo.repository';

@Module({
  imports: [PrismaModule],
  controllers: [ModeloController],
  providers: [ModeloService, PrismaService, ModeloRepository],
  exports: [ModeloService],
})
export class ModeloModule {}
