/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  validate(email: string, password: string) {
    // console.log(email + " - " + password)
    const retService = this.authService.validateUser(email, password);
    // console.log(retService)
    return retService
  }
}
