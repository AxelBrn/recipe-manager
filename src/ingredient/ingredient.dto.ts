import { ApiProperty } from '@nestjs/swagger';

export default class IngredientDto {
  @ApiProperty({ example: 'name', description: 'Name of ingredient' })
  readonly name: string;
  @ApiProperty({ example: 10.0, description: 'Price of ingredient' })
  readonly price: number;
}
