import * as jwt from 'jsonwebtoken';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import TokenDto from 'src/user/application/dto/token.dto';

@Injectable()
export default class AuthService {
  private createAccessToken(user: { id: number; coupleId?: number }) {
    return jwt.sign(user, 'test', { expiresIn: '3d' });
  }

  private createRefreshToken(user: { id: number; coupleId?: number }) {
    return jwt.sign(user, 'test', { expiresIn: '30d' });
  }

  verify(jwtToken: string): jwt.JwtPayload {
    try {
      return jwt.verify(jwtToken, 'test') as jwt.JwtPayload;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  signin(id: number): TokenDto {
    return {
      access: this.createAccessToken({ id }),
      refresh: this.createRefreshToken({ id }),
    };
  }
}
