import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, PostModule],
  controllers: [AppController],
  providers: [AppService, ],
})
export class AppModule {}
