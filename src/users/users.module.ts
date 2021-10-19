import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { UserSchema } from './schemas/user.schema';
import { UserController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'user', schema: UserSchema, collection: 'user' },
    ]),
    AuthModule,
  ],
  exports: [UsersService],
  controllers: [UserController],
  providers: [UsersService],
})
export class UsersModule {}
