import { Module } from '@nestjs/common';
import { PermissoesService } from './permissoes.service';
import { PermissoesController } from './permissoes.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { PermissoesRepository } from './repositories/permissoes.repository';

@Module({
  imports: [PrismaModule],
  controllers: [PermissoesController],
  providers: [PermissoesService, PrismaService, PermissoesRepository],
  exports: [PermissoesService],
})
export class PermissoesModule {}
