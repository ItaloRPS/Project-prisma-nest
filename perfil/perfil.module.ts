import { Module } from '@nestjs/common';
import { PerfilService } from './perfil.service';
import { PerfilController } from './perfil.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { PerfilRepository } from './repositories/perfil.repository';

@Module({
  imports: [PrismaModule],
  controllers: [PerfilController],
  providers: [PerfilService, PrismaService, PerfilRepository],
  exports: [PerfilService],
})
export class PerfilModule {}
