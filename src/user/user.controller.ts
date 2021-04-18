import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import UserDto from './user.dto';
import UserBuilder from './user.builder';

@ApiTags('Users')
@Controller('/api/v1/users')
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @Post('/')
  create(@Body() userDto: UserDto) {
    return this.userService
      .create(UserBuilder.buildOne(userDto))
      .then((response) => response);
  }
}
