import { Body, Controller, Post } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { randomUUID } from 'node:crypto';
import { CreateCompany } from './dtos/create-company';

@Controller()
export class AppController {
  constructor(private prismaService: PrismaService) {}

  @Post()
  async getHello(@Body() body: CreateCompany) {
    const { nickname, trade_name, legal_name, cnpj, uf, city, logo } = body;

    const company = await this.prismaService.company.create({
      data: {
        company_id: randomUUID(),
        nickname,
        trade_name,
        legal_name,
        cnpj,
        uf,
        city,
        logo,
      },
    });

    return company;
  }
}
