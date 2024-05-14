import { Module } from '@nestjs/common';
import { TemaItemService } from './tema-item.service';
import { TemaItemController } from './tema-item.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TemaItemRepository } from './repositories/tema-item.repository';

@Module({
  imports: [PrismaModule],
  controllers: [TemaItemController],
  providers: [TemaItemService, PrismaService, TemaItemRepository],
  exports: [TemaItemService],
})
export class TemaItemModule {}
