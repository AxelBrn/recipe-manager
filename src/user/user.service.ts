import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import User from './user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  public async findOneByMail(mail: string): Promise<User> {
    return await this.userRepository.findOne({ where: { mail: mail } });
  }

  public async create(user: User): Promise<User> {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.getPassword(), salt);
    user.setPassword(hash);
    return await this.userRepository.save(user);
  }
}
