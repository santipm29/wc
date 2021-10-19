import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

export class JwtEstrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.APP_JWT_SECRET,
    });
  }

  async validate(payload): Promise<any> {
    return { userId: payload.userId, username: payload.username };
  }
}
