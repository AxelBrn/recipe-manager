import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { RecipeDto } from './recipe.dto';
import { RecipeService } from './recipe.service';
import RecipeBuilder from './recipe.builder';
import { IngredientService } from '../ingredient/ingredient.service';
import IngredientDto from 'src/ingredient/ingredient.dto';
import IngredientBuilder from 'src/ingredient/ingredient.builder';
import { AuthGuard } from 'src/auth/auth.gard';
import { JwtId } from 'src/auth/auth.decorator';

@ApiTags('Recipes')
@ApiBearerAuth()
@Controller('/api/v1/recipes')
export class RecipeController {
  constructor(
    private readonly recipeService: RecipeService,
    private readonly ingredientService: IngredientService,
  ) {}

  @Get('/')
  @UseGuards(new AuthGuard())
  index(@JwtId() id: number) {
    return this.recipeService.findAll(id).then((recipes) => {
      return recipes;
    });
  }

  @Get('/:id')
  @UseGuards(new AuthGuard())
  getOne(@Param('id') id: number, @JwtId() idUser: number) {
    return this.recipeService.findOne(id, idUser);
  }

  @Post('/')
  @UseGuards(new AuthGuard())
  @HttpCode(HttpStatus.CREATED)
  create(@Body() recipeDto: RecipeDto, @JwtId() id: number) {
    return this.recipeService.create(RecipeBuilder.buildOne(recipeDto), id);
  }

  @Put('/:id')
  update(@Param('id') id: number, @Body() recipeDto: RecipeDto) {
    return this.recipeService.update(id, RecipeBuilder.buildOne(recipeDto));
  }

  @Delete('/:id')
  @UseGuards(new AuthGuard())
  delete(@Param('id') id: number) {
    return this.ingredientService.deleteAllByRecipe(id).then(() => {
      return this.recipeService.delete(id);
    });
  }

  // --- Ingredients CRUD ---

  @Get('/:id/ingredients')
  @UseGuards(new AuthGuard())
  getAllIngredients(@Param('id') id: number, @JwtId() idUser: number) {
    return this.ingredientService.findAllByRecipe(id, idUser);
  }

  @Get('/:r_id/ingredients/:i_id')
  @UseGuards(new AuthGuard())
  getOneIngredient(
    @Param('r_id') idRecipe: number,
    @Param('i_id') idIngredient: number,
    @JwtId() idUser: number,
  ) {
    return this.ingredientService.findOneByRecipe(
      idRecipe,
      idIngredient,
      idUser,
    );
  }

  @Post('/:id/ingredients')
  @UseGuards(new AuthGuard())
  createIngredient(
    @Param('id') id: number,
    @Body() ingredientDto: IngredientDto,
  ) {
    return this.ingredientService.create(
      id,
      IngredientBuilder.buildOne(ingredientDto),
    );
  }

  @Put('/:r_id/ingredients/:i_id')
  @UseGuards(new AuthGuard())
  updateIngredient(
    @Param('r_id') idRecipe: number,
    @Param('i_id') idIngredient: number,
    @Body() ingredientDto: IngredientDto,
  ) {
    return this.ingredientService.update(
      idRecipe,
      idIngredient,
      IngredientBuilder.buildOne(ingredientDto),
    );
  }

  @Delete('/:r_id/ingredients/:i_id')
  @UseGuards(new AuthGuard())
  deleteIngredient(
    @Param('r_id') idRecipe: number,
    @Param('i_id') idIngredient: number,
  ) {
    return this.ingredientService.delete(idRecipe, idIngredient);
  }
}
