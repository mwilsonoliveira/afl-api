import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './database/prisma.service';
import { CompanyController } from './companies/companies.controller';
import { UsersModule } from './users/users.module';
import { ContractsController } from './contracts/contracts.controller';
import { DepartmentsController } from './departments/departments.controller';
import { ServicesController } from './services/services.controller';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
@Module({
  imports: [UsersModule, AuthModule],
  controllers: [
    AppController,
    CompanyController,
    ContractsController,
    DepartmentsController,
    ServicesController,
  ],
  providers: [
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
