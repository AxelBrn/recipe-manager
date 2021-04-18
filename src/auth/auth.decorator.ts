import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export const JwtId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (!request.headers.authorization) {
      return 0;
    }
    try {
      const token: string = request.headers.authorization.split(' ')[1];
      return jwt.decode(token)['id'];
    } catch (e) {
      console.log(e);
      return 0;
    }
  },
);
