import UserDto from './user.dto';
import User from './user.entity';

export default class UserBuilder {
  public static buildOne(userDto: UserDto): User {
    const user: User = new User();
    user.setFirstname(userDto.firstname);
    user.setLastname(userDto.lastname);
    user.setMail(userDto.mail);
    user.setPassword(userDto.password);

    return user;
  }
}
