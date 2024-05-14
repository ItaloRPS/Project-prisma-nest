/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { UnauthorizedError } from './errors/unauthorized.error';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { UserPayload } from './models/UserPayload';
import { UserToken } from './models/UserToken';
import { EmailService } from '../common/email/email.service';
import { TemplateEmail } from '../common/email/templateEmail';


@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly emailService: EmailService,
    private readonly templateEmail: TemplateEmail,
  ) {}

  async login(user): Promise<UserToken> {

    const empresa = user?.UserEmpresa?.map((item) => item.idempresa);

    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      status: user.status,
      idempresa: empresa,
      idperfil: user.idperfil,
      perfil: user.perfil,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string): Promise<UserEntity> {
    if (!email || !password) {
      throw new UnauthorizedError('Credenciais de login não fornecidas corretamente.');
    }

    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedError('Nenhum usuário encontrado com o email fornecido.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      return {
        ...user,
        password: undefined,
        passwordResetToken: undefined,
        passwordResetExpires: undefined,
      };
    }

    throw new UnauthorizedError('O endereço de email ou a senha fornecida está incorreto.');
  }

  
  async requestPasswordReset(email: string) {
    const buffer = crypto.randomBytes(32);
    const token = buffer.toString('hex');
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw "Usuário não encontrado."
    }
    user.passwordResetToken = token;
    user.passwordResetExpires = new Date(Date.now() + 3600000); // 1 hora
   
    await this.userService.update(user.id, {passwordResetToken:token,passwordResetExpires: new Date(Date.now() + 3600000)})
    const resetURL = `${process.env.MULTLEADS}/passwordreset/${token}`;
    const text = this.templateEmail.template(resetURL,user.name,'90')
     const retornoEmail = await this.emailService.sendMail(email,'Alteração de Senha','',text)
   

     return retornoEmail
  }
}
