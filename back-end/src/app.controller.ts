import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
// import { CurrentUser } from './auth/decorators/current-user.decorator';
// import { UserEntity } from './user/entities/user.entity';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Default')
@Controller('api/v1')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  // @Get('/me')
  // getMe(@CurrentUser() currentUser: UserEntity) {
  //   return currentUser;
  // }
}
