import { Module } from '@nestjs/common';
import { CidadeService } from './cidade.service';
import { CidadeController } from './cidade.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { CidadeRepository } from './repositories/cidade.repository';

@Module({
  imports: [PrismaModule],
  controllers: [CidadeController],
  providers: [CidadeService, PrismaService, CidadeRepository],
  exports: [CidadeService],
})
export class CidadeModule {}
