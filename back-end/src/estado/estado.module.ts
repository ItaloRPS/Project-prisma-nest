import { Module } from '@nestjs/common';
import { EstadoService } from './estado.service';
import { EstadoController } from './estado.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { EstadoRepository } from './repositories/estado.repository';

@Module({
  imports: [PrismaModule],
  controllers: [EstadoController],
  providers: [EstadoService, PrismaService, EstadoRepository],
  exports: [EstadoService],
})
export class EstadoModule {}
