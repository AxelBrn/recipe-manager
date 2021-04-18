import { ApiProperty } from '@nestjs/swagger';

export default class UserDto {
  @ApiProperty({ example: 'firstname', description: 'User firstname' })
  readonly firstname: string;
  @ApiProperty({ example: 'lastname', description: 'User lastname' })
  readonly lastname: string;
  @ApiProperty({ example: 'mail@example.com', description: 'User mail' })
  readonly mail: string;
  @ApiProperty({ example: 'password', description: 'User password' })
  readonly password: string;
}
