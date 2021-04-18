import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  private id: number;

  @Column()
  private firstname: string;

  @Column()
  private lastname: string;

  @Column()
  private mail: string;

  @Column()
  private password: string;

  public getId(): number {
    return this.id;
  }

  public getFirstname(): string {
    return this.firstname;
  }

  public getLastname(): string {
    return this.lastname;
  }

  public getMail(): string {
    return this.mail;
  }

  public getPassword(): string {
    return this.password;
  }

  public setId(value: number) {
    this.id = value;
  }

  public setFirstname(value: string) {
    this.firstname = value;
  }

  public setLastname(value: string) {
    this.lastname = value;
  }

  public setMail(value: string) {
    this.mail = value;
  }

  public setPassword(value: string) {
    this.password = value;
  }
}
