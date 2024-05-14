import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersRepository } from './repositories/users.repository';

@Module({
  imports:[],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, UsersRepository],
  exports:[UsersService]
})
export class UsersModule {}
