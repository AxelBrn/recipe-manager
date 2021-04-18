import { Injectable } from '@nestjs/common';
import User from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import AuthDto from './auth.dto';
import * as bcryptjs from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import TokenModel from './token.model';

@Injectable()
export class AuthService {
  public constructor(private readonly userService: UserService) {}

  public async login(authDto: AuthDto) {
    const user: User = await this.userService.findOneByMail(authDto.mail);
    if (user !== undefined) {
      if (bcryptjs.compareSync(authDto.password, user.getPassword())) {
        return this.generateTokens(user);
      } else {
        return {
          message: 'Bad Password Arguments !',
        };
      }
    } else {
      return {
        message: 'Bad Mail Arguments !',
      };
    }
  }

  public refresh(cookies: string): any {
    const refreshToken = cookies.split('refreshToken=')[1];
    try {
      const token: any = jwt.decode(refreshToken);
      const user: User = new User();
      user.setId(token.id);
      user.setFirstname(token.firstname);
      user.setLastname(token.lastname);
      user.setMail(token.mail);
      user.setPassword(token.password);
      return this.generateTokens(user);
    } catch (e) {
      return {
        statusCode: 404,
        message: 'Cannot found refreshToken !',
      };
    }
  }

  private generateTokens(user: User): TokenModel {
    const privateKey = fs.readFileSync('./jwt/id_rsa', 'utf8');
    return new TokenModel(
      jwt.sign({ ...user }, privateKey, {
        algorithm: 'RS256',
        expiresIn: process.env.JWT_ACCESS_EXPIRE + 's',
      }),
      jwt.sign({ ...user }, privateKey, {
        algorithm: 'RS256',
        expiresIn: process.env.JWT_REFRESH_EXPIRE + 'h',
      }),
    );
  }
}
