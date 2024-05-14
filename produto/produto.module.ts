import { Module } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { ProdutoController } from './produto.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProdutoRepository } from './repositories/produto.repository';

@Module({
  imports: [PrismaModule],
  controllers: [ProdutoController],
  providers: [ProdutoService, PrismaService, ProdutoRepository],
  exports: [ProdutoService],
})
export class ProdutoModule {}
