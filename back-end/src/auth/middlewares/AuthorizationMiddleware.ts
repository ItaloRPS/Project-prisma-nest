import { Injectable, UnauthorizedException } from '@nestjs/common';
import { NestMiddleware } from '@nestjs/common/interfaces';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '');
      if (!token) {
        throw new UnauthorizedException('Token não fornecido');
      }

      const decoded = this.jwtService.verify(token);
      const userRole = decoded;
      const perfil = userRole.perfil.nome

      if (perfil === 'Admin' || perfil === 'Empresa' || perfil === 'Lead' || perfil === 'Lojista') {
        next();
      } else {
        throw new UnauthorizedException('Acesso não autorizado');
      }
    } catch (error) {
      throw new UnauthorizedException('Acesso não autorizado');
    }
  }
}