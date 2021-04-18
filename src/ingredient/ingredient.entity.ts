import Recipe from 'src/recipe/recipe.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Ingredient {
  @PrimaryGeneratedColumn()
  private id: number;

  @Column()
  private name: string;

  @Column('double')
  private price: number;

  @ManyToOne(() => Recipe)
  private recipe: Recipe;

  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getPrice(): number {
    return this.price;
  }

  public setId(value: number) {
    this.id = value;
  }

  public setName(value: string) {
    this.name = value;
  }

  public setPrice(value: number) {
    this.price = value;
  }

  public getRecipe(): Recipe {
    return this.recipe;
  }

  public setRecipe(value: Recipe) {
    this.recipe = value;
  }
}
