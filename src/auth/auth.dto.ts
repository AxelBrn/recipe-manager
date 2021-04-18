import { ApiProperty } from '@nestjs/swagger';

export default class AuthDto {
  @ApiProperty({ example: 'exemple@domain.com' })
  readonly mail: string;
  @ApiProperty({ example: 'mdp' })
  readonly password: string;
}
