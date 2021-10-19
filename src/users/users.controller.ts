import { Controller, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
@UseGuards(AuthGuard())
export class UserController {
  @Put()
  updateUser() {
    return 'update';
  }
}
