import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './database/prisma.service';
import { CompanyController } from './company/company.controller';
@Module({
  imports: [],
  controllers: [AppController, CompanyController],
  providers: [PrismaService],
})
export class AppModule {}
