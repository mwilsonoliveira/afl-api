import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './database/prisma.service';
import { CompanyController } from './companies/companies.controller';
import { UsersModule } from './users/users.module';
@Module({
  imports: [UsersModule],
  controllers: [AppController, CompanyController],
  providers: [PrismaService],
})
export class AppModule {}
