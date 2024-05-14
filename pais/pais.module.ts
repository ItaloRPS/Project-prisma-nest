import { Module } from '@nestjs/common';
import { PaisService } from './pais.service';
import { PaisController } from './pais.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaisRepository } from './repositories/pais.repository';

@Module({
  imports: [PrismaModule],
  controllers: [PaisController],
  providers: [PaisService, PrismaService, PaisRepository],
  exports: [PaisService],
})
export class PaisModule {}
