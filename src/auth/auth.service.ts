import * as jwt from 'jsonwebtoken';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import TokenDto from 'src/user/domain/dto/token.dto';

@Injectable()
export default class AuthService {
  private createAccessToken(user: { id: number }) {
    return jwt.sign(user, 'test', { expiresIn: '3d' });
  }

  private createRefreshToken(user: { id: number }) {
    return jwt.sign(user, 'test', { expiresIn: '7d' });
  }

  verify(jwtToken: string): string | jwt.JwtPayload {
    try {
      return jwt.verify(jwtToken, 'test');
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  login(id: number): TokenDto {
    return {
      access: this.createAccessToken({ id }),
      refresh: this.createRefreshToken({ id }),
    };
  }
}
