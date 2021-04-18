import IngredientDto from './ingredient.dto';
import Ingredient from './ingredient.entity';

export default class IngredientBuilder {
  public static buildOne(ingredientDto: IngredientDto): Ingredient {
    const ingredient: Ingredient = new Ingredient();
    ingredient.setName(ingredientDto.name);
    ingredient.setPrice(ingredientDto.price);
    return ingredient;
  }
}
