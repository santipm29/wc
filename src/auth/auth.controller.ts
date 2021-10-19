import { AuthService } from './auth.service';
import { CreateUserDTO } from './../users/dto/create-user.dto';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() user: CreateUserDTO) {
    return await this.authService.signUp(user);
  }

  @HttpCode(200)
  @Post('signin')
  async signIn(@Body() authCredentials: AuthCredentialsDTO) {
    return await this.authService.signIn(authCredentials);
  }
}
