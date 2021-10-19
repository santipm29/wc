import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(createUserDto: CreateUserDTO): Promise<User> {
    const user = new this.userModel(createUserDto);
    try {
      return await user.save();
    } catch (error) {
      if (error?.code === 11000) {
        throw new HttpException('Username already exists', HttpStatus.CONFLICT);
      } else {
        throw new HttpException(
          'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async validatePassword(authCredentials): Promise<User> {
    const { username, password } = authCredentials;
    const user = await this.userModel.findOne({ username });
    if (user && (await user.validatePassword(password))) {
      return user;
    }
    return null;
  }
}
