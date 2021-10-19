import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(user: CreateUserDTO) {
    return this.userService.createUser(user);
  }

  async signIn(authCredentials: AuthCredentialsDTO) {
    const user = await this.userService.validatePassword(authCredentials);
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const accessToken = await this.jwtService.signAsync({
      username: user?.username,
      userId: user?._id,
    });
    return { accessToken };
  }
}
