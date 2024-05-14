import { Module } from '@nestjs/common';
import { EmpresaService } from './empresa.service';
import { EmpresaController } from './empresa.controller';
import { EmpresaRepository } from './repositories/empresa.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EmpresaController],
  providers: [EmpresaService, PrismaService, EmpresaRepository],
  exports: [EmpresaService],
})
export class EmpresaModule {}
