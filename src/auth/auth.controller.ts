import { Body, Controller, Get, Post, Res, Req } from '@nestjs/common';
import { Response, Request } from 'express';
import AuthDto from './auth.dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import TokenModel from './token.model';

@ApiTags('Auth')
@Controller('/api/v1/auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post('/')
  login(@Body() authDto: AuthDto, @Res() res) {
    return this.authService.login(authDto).then((response) => {
      if (response instanceof TokenModel) {
        res.cookie('refreshToken', response.getRefreshToken(), {
          expires: new Date(
            new Date().getTime() +
              parseInt(process.env.JWT_REFRESH_EXPIRE) * 60 * 60 * 1000,
          ),
          sameSite: 'strict',
          httpOnly: true,
        });
        return res.send({ token: response.getToken() });
      }
      return res.send(response);
    });
  }

  @Get('/refresh')
  refresh(@Req() req: Request, @Res() res: Response) {
    if (req.headers.cookie) {
      const response: any = this.authService.refresh(req.headers.cookie);
      if (response instanceof TokenModel) {
        res.cookie('refreshToken', response.getRefreshToken(), {
          expires: new Date(
            new Date().getTime() +
              parseInt(process.env.JWT_REFRESH_EXPIRE) * 60 * 60 * 1000,
          ),
          sameSite: 'strict',
          httpOnly: true,
        });
        return res.send({ token: response.getToken() });
      } else {
        return res.status(response.statusCode).send(response);
      }
    }
    return res.status(404).send({
      statusCode: 404,
      message: 'Request send without cookies',
    });
  }
}
