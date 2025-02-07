import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../jwt-payload';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refresh_token'),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_AUTH_SECRET,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async validate({ iat, exp, ...payload }: JwtPayload) {
    return payload;
  }
}
