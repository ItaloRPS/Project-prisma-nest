import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { LoginValidationMiddleware } from './middlewares/login-validation.middleware';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailService } from '../common/email/email.service';
import { TemplateEmail } from '../common/email/templateEmail';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.mailgun.org', //host smtp
        secure: false, //regras de segurança do serviço smtp
        port: 587, // porta
        auth: {
          //dados do usuário e senha
          user: process.env.MAIL,
          pass: process.env.PASS,
        },
        ignoreTLS: true,
      },
      defaults: {
        // configurações que podem ser padrões
        from: '"',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy,EmailService,TemplateEmail],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginValidationMiddleware).forRoutes('login');
  }
}
