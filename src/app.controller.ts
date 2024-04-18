import { Controller, Get } from '@nestjs/common';
@Controller()
export class AppController {
  @Get()
  async getApi() {
    return 'API is Running';
  }
}
