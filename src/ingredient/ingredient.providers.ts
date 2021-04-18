import { Connection } from 'typeorm';
import Ingredient from './ingredient.entity';

export const ingredientProviders = [
  {
    provide: 'INGREDIENT_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(Ingredient),
    inject: ['DATABASE_CONNECTION'],
  },
];
