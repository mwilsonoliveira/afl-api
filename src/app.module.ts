import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './database/prisma.service';
import { CompanyController } from './companies/companies.controller';
import { UsersModule } from './users/users.module';
import { ContractsController } from './contracts/contracts.controller';
import { DepartmentsController } from './departments/departments.controller';
import { ServicesController } from './services/services.controller';
@Module({
  imports: [UsersModule],
  controllers: [
    AppController,
    CompanyController,
    ContractsController,
    DepartmentsController,
    ServicesController,
  ],
  providers: [PrismaService],
})
export class AppModule {}
