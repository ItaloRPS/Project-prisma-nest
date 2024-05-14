import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserFromJwt } from '../models/UserFromJwt';
import { UserPayload } from '../models/UserPayload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: UserPayload): Promise<UserFromJwt> {

    // console.log("jwt.strategy.ts")
    // console.log(payload)

    return {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      status: payload.status,
      idempresa: payload.idempresa,
      idperfil: payload.idperfil,
      perfil: payload.perfil,
    };
  }
}