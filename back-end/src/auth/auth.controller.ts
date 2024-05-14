import {
  Body,
  Controller,
  NotFoundException,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest';
import { IsPublic } from './decorators/is-public.decorator';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/user/entities/user.entity';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';

@ApiTags('Auth')
@Controller('/api/v1')
export class AuthController {
    constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @IsPublic()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: AuthRequest) {
    return this.authService.login(req.user);
  }
  
  @IsPublic()
  @Post('requestReset')
  async requestPasswordReset(@Body('email') email: string) {
    try {
      const retorno = await this.authService.requestPasswordReset(email);
      return {
        message: 'E-mail enviado com sucesso!',
        result: retorno,
      };
    } catch (error) {
      throw new NotFoundException({
        message: 'erro',
        error: error,
      });
    }
  }
  
  @IsPublic()
  @Patch('passwordReset/:token')
  async passwordReset(
    @Param('token') passwordResetToken: string,
    @Body() body: UpdateUserDto,
  ) {
    try {
      const user = await this.userService.findUniqueToken(passwordResetToken);
      if (!user) {
        throw new NotFoundException('Registro não encontrado');
      }
      const saltRounds = 10;
      console.log('password', body.password);
      const hashedPassword = await bcrypt.hash(body.password, saltRounds);
      const newPassword = { password: hashedPassword };
      const userUpdated = await this.userService.update(user.id, newPassword);
      return {
        message: 'sucesso',
        result: userUpdated,
      };
    } catch (error) {
      // Tratamento de erro apropriado
      throw new NotFoundException({
        message: 'erro',
        error: error.message,
      });
    }
  }
}
