import { Module } from '@nestjs/common';
import { AcessoService } from './acesso.service';
import { AcessoController } from './acesso.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AcessoRepository } from './repositories/acesso.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AcessoController],
  providers: [AcessoService, PrismaService, AcessoRepository],
  exports: [AcessoService],
})
export class AcessoModule {}
