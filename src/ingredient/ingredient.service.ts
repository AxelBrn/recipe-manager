import { Inject, Injectable } from '@nestjs/common';
import Recipe from 'src/recipe/recipe.entity';
import { Repository, UpdateResult } from 'typeorm';
import Ingredient from './ingredient.entity';

@Injectable()
export class IngredientService {
  constructor(
    @Inject('INGREDIENT_REPOSITORY')
    private ingredientRepository: Repository<Ingredient>,
    @Inject('RECIPE_REPOSITORY')
    private recipeRepository: Repository<Recipe>,
  ) {}

  async findAllByRecipe(
    idRecipe: number,
    idUser: number,
  ): Promise<Ingredient[]> {
    return await this.ingredientRepository.find({
      where: {
        recipe: {
          id: idRecipe,
          user: idUser,
        },
      },
    });
  }

  async findOneByRecipe(
    idRecipe: number,
    idIngredient: number,
    idUser: number,
  ): Promise<Ingredient> {
    return await this.ingredientRepository.findOne(idIngredient, {
      where: {
        recipe: {
          id: idRecipe,
          user: idUser,
        },
      },
    });
  }

  async create(idRecipe: number, ingredient: Ingredient) {
    const recipe: Recipe = await this.recipeRepository.findOne(idRecipe);
    ingredient.setRecipe(recipe);
    return await this.ingredientRepository.save(ingredient);
  }

  async update(
    idRecipe: number,
    idIngredient: number,
    ingredient: Ingredient,
  ): Promise<UpdateResult> {
    return await this.ingredientRepository
      .createQueryBuilder()
      .update()
      .set(ingredient)
      .where('id = :iId ', {
        iId: idIngredient,
      })
      .andWhere('recipe = :rId', { rId: idRecipe })
      .execute();
  }

  async delete(idRecipe: number, idIngredient: number) {
    return await this.ingredientRepository
      .createQueryBuilder()
      .delete()
      .where('id = :iId ', {
        iId: idIngredient,
      })
      .andWhere('recipe = :rId', { rId: idRecipe })
      .execute();
  }

  async deleteAllByRecipe(idRecipe: number) {
    return await this.ingredientRepository
      .createQueryBuilder()
      .delete()
      .where('recipe = :id ', {
        id: idRecipe,
      })
      .execute();
  }
}
