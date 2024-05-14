import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from 'src/user/entities/user.entity';
import { AuthRequest } from '../models/AuthRequest';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): UserEntity => {
    const request = context.switchToHttp().getRequest<AuthRequest>();
    // console.log(request.user);
    if (Object.keys(request.user).length === 0) {
      throw new Error("Não foi encontrado usuario para validação.");
    } else {
      return request.user;
    }
  },
);
