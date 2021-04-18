import { RecipeDto } from './recipe.dto';
import Recipe from './recipe.entity';

export default class RecipeBuilder {
  public static buildOne(recipeDto: RecipeDto): Recipe {
    const recipe: Recipe = new Recipe();
    recipe.setTitle(recipeDto.title);
    recipe.setDescription(recipeDto.description);
    recipe.setCookingInstructions(recipeDto.cookingInstructions);
    recipe.setEstimatedTime(recipeDto.estimatedTime);
    recipe.setCreationDate(recipeDto.creationDate);
    return recipe;
  }
}
