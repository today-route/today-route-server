import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class AuthService {
  createAccessToken(user: { id: number; email: string; nickname: string }) {
    return jwt.sign(user, 'test', { expiresIn: '3d' });
  }

  createRefreshToken(user: { id: number; email: string; nickname: string }) {
    return jwt.sign(user, 'test', { expiresIn: '7d' });
  }
}
