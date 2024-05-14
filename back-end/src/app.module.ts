/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { EmpresaModule } from './empresa/empresa.module';
import { ConfigModule } from '@nestjs/config';
import { LeadModule } from './lead/lead.module';
import { PerfilModule } from './perfil/perfil.module';
import { PermissoesModule } from './permissoes/permissoes.module';
import { ProdutoModule } from './produto/produto.module';
import { LoteModule } from './lote/lote.module';
import { AcessoModule } from './acesso/acesso.module';
import { ConfigprodutoModule } from './configproduto/configproduto.module';
import { ModeloModule } from './modelo/modelo.module';
import { TemaModule } from './tema/tema.module';
import { TemaItemModule } from './tema-item/tema-item.module';
import { CidadeModule } from './cidade/cidade.module';
import { EstadoModule } from './estado/estado.module';
import { PaisModule } from './pais/pais.module';
import { FileModule } from './file/file.module';
import { MessageModule } from './message/message.module';
import { WhatsappModule } from './whatsapp/whatsapp.module';
import { EmailService } from './common/email/email.service';
 import { LojistaModule } from './lojista/lojista.module';
 import { ScheduleModule } from '@nestjs/schedule';
import { AuthorizationMiddleware } from './auth/middlewares/AuthorizationMiddleware';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    UserModule,
    AuthModule,
    EmpresaModule,
    LeadModule,
    PerfilModule,
    PermissoesModule,
    ProdutoModule,
    LoteModule,
    AcessoModule,
    ConfigprodutoModule,
    ModeloModule,
    TemaModule,
    TemaItemModule,
    CidadeModule,
    EstadoModule,
    PaisModule,
    FileModule,
    MessageModule,
    WhatsappModule,
    LojistaModule,
    ScheduleModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    // {
    //   provide: APP_FILTER,
    //   useClass: AllExceptionsFilter,
    // },
    EmailService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
  consumer.apply(AuthorizationMiddleware).exclude({ path: '/api/v1/login', method: RequestMethod.POST }).forRoutes('*');
  }

}

