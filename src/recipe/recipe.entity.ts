import Ingredient from 'src/ingredient/ingredient.entity';
import User from 'src/user/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
export default class Recipe {
  @PrimaryGeneratedColumn()
  private id: number;

  @Column()
  private title: string;

  @Column()
  private description: string;

  @Column()
  private cookingInstructions: string;

  @Column()
  private estimatedTime: string;

  @Column()
  private creationDate: Date;

  @OneToMany(() => Ingredient, 'id', { nullable: false })
  private ingredients: Ingredient[];

  @ManyToOne(() => User)
  private user: User;

  public getId(): number {
    return this.id;
  }

  public getTitle(): string {
    return this.title;
  }

  public getDescription(): string {
    return this.description;
  }

  public getCookingInstructions(): string {
    return this.cookingInstructions;
  }

  public getEstimatedTime(): string {
    return this.estimatedTime;
  }

  public getCreationDate(): Date {
    return this.creationDate;
  }

  public setId(value: number) {
    this.id = value;
  }

  public setTitle(value: string) {
    this.title = value;
  }

  public setDescription(value: string) {
    this.description = value;
  }

  public setCookingInstructions(value: string) {
    this.cookingInstructions = value;
  }

  public setEstimatedTime(value: string) {
    this.estimatedTime = value;
  }

  public setCreationDate(value: Date) {
    this.creationDate = value;
  }

  public getIngredients(): Ingredient[] {
    return this.ingredients;
  }

  public getUser(): User {
    return this.user;
  }

  public setIngredients(value: Ingredient[]) {
    this.ingredients = value;
  }

  public setUser(value: User) {
    this.user = value;
  }
}
