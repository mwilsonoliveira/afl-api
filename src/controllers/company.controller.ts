import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { PrismaService } from 'src/database/prisma.service';
import { CreateCompany } from 'src/dtos/company/create-company';

@Controller('company')
export class CompanyController {
  constructor(private prismaService: PrismaService) {}

  @Get('/:id')
  async findCompany(@Param('id') id: string) {
    const company = await this.prismaService.companies.findUnique({
      where: {
        company_id: id,
      },
    });

    return company;
  }

  @Post()
  async createCompany(@Body() body: CreateCompany) {
    const { nickname, trade_name, legal_name, cnpj, uf, city, logo } = body;

    const company = await this.prismaService.companies.create({
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
