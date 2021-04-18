import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { RecipeModule } from './recipe/recipe.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    DatabaseModule,
    RecipeModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
    }),
  ],
})
export class AppModule {}
