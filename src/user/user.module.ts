import { Module } from '@nestjs/common';
import { userProviders } from './user.providers';
import { DatabaseModule } from '../database/database.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...userProviders, UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
