import { Injectable, Inject } from '@nestjs/common';
import User from 'src/user/user.entity';
import { Repository } from 'typeorm';
import Recipe from './recipe.entity';

@Injectable()
export class RecipeService {
  constructor(
    @Inject('RECIPE_REPOSITORY')
    private recipeRepository: Repository<Recipe>,
  ) {}

  async findAll(idUser: number): Promise<Recipe[]> {
    return await this.recipeRepository.find({ where: { user: idUser } });
  }

  async findOne(id: number, idUser: number): Promise<Recipe> {
    return await this.recipeRepository.findOne(id, { where: { user: idUser } });
  }

  async create(recipe: Recipe, idUser: number) {
    const user: User = new User();
    user.setId(idUser);
    recipe.setUser(user);
    return await this.recipeRepository.save(recipe);
  }

  async delete(id: number) {
    return await this.recipeRepository.delete(id);
  }

  async update(id: number, recipe: Recipe) {
    return await this.recipeRepository.update(id, recipe);
  }
}
