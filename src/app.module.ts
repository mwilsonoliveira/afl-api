import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './database/prisma.service';
import { CompanyController } from './controllers/company.controller';
import { ContractController } from './controllers/contract.controller';
@Module({
  imports: [],
  controllers: [AppController, CompanyController, ContractController],
  providers: [PrismaService],
})
export class AppModule {}
