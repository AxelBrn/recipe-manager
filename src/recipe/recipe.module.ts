import { Module } from '@nestjs/common';
import { recipeProviders } from './recipe.providers';
import { RecipeService } from './recipe.service';
import { DatabaseModule } from '../database/database.module';
import { RecipeController } from './recipe.controller';
import { ingredientProviders } from 'src/ingredient/ingredient.providers';
import { IngredientService } from 'src/ingredient/ingredient.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...recipeProviders,
    ...ingredientProviders,
    RecipeService,
    IngredientService,
  ],
  controllers: [RecipeController],
})
export class RecipeModule {}
