import { ApiProperty } from '@nestjs/swagger';

export class RecipeDto {
  @ApiProperty({ example: 'title', description: 'Title of recipe' })
  readonly title: string;
  @ApiProperty({ example: 'description', description: 'Description of recipe' })
  readonly description: string;
  @ApiProperty({
    example: 'cooking intructions',
    description: 'Cooking instructions',
  })
  readonly cookingInstructions: string;
  @ApiProperty({
    example: '30min',
    description: 'Estimated time to create this recipe',
  })
  readonly estimatedTime: string;
  @ApiProperty({ example: new Date(), description: 'Creation date' })
  readonly creationDate: Date;
}
