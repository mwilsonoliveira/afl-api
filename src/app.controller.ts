import { Controller, Get } from '@nestjs/common';
import { CurrentUser } from './auth/decorators/current-user.decorator';
import { User } from './users/entities/user.entity';
@Controller()
export class AppController {
  @Get()
  async getApi() {
    return 'API is Running';
  }

  @Get('me')
  getMe(@CurrentUser() user: User) {
    return user;
  }
}
