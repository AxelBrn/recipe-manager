import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.headers.authorization) {
      return false;
    }
    request.user = await this.validateToken(request.headers.authorization);
    return true;
  }

  async validateToken(auth: string) {
    if (auth.split(' ')[0] !== 'Bearer') {
      throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
    }
    try {
      const token = auth.split(' ')[1];
      const publicKey = fs.readFileSync('./jwt/id_rsa.pub', 'utf8');
      await jwt.verify(token, publicKey, {
        algorithms: ['RS256'],
      });
    } catch (error) {
      const message = 'Token Error: ' + (error.message || error.name);
      throw new HttpException(message, HttpStatus.FORBIDDEN);
    }
  }
}
