import { Module } from '@nestjs/common';
import { ConfigprodutoService } from './configproduto.service';
import { ConfigprodutoController } from './configproduto.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigProdutoRepository } from './repositories/configProduto.repository';

@Module({
  imports: [PrismaModule],
  controllers: [ConfigprodutoController],
  providers: [ConfigprodutoService, PrismaService, ConfigProdutoRepository],
  exports: [ConfigprodutoService],
})
export class ConfigprodutoModule {}
