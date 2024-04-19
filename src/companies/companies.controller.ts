import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { PrismaService } from 'src/database/prisma.service';
import { CreateCompany } from 'src/Companies/dto/create-company';

@Controller('companies')
export class CompanyController {
  constructor(private prismaService: PrismaService) {}

  @Get('/:id')
  async getCompany(@Param('id') id: string) {
    const company = await this.prismaService.company.findUnique({
      where: {
        company_id: id,
      },
    });

    return company;
  }

  @Get()
  async findAll() {
    const companies = await this.prismaService.company.findMany();
    return companies;
  }

  @Post('/create')
  async createCompany(@Body() body: CreateCompany) {
    const { nickname, trade_name, legal_name, cnpj, uf, city, logo } = body;

    const companyAlreadyExists = await this.prismaService.company.findFirst({
      where: {
        cnpj,
      },
    });

    if (companyAlreadyExists) {
      throw new BadRequestException('This company already exists!', {
        cause: new Error(),
        description: 'This company already exists!',
      });
    }

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
