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
import { CreateCompanyDto } from 'src/Companies/dto/create-company';

@Controller('companies')
export class CompanyController {
  constructor(private prismaService: PrismaService) {}

  @Get('/:id')
  async getCompany(@Param('id') id: string) {
    const company = await this.prismaService.company.findUnique({
      where: {
        company_id: id,
      },
      include: {
        contracts: {
          include: {
            departments: {
              include: {
                services: true,
              },
            },
          },
        },
      },
    });

    if (!company) {
      throw new BadRequestException(`Company with ID ${id} not found`, {
        cause: new Error(),
        description: `Company with ID ${id} not found`,
      });
    }

    return company;
  }

  @Get()
  async getAllCompanies() {
    const companies = await this.prismaService.company.findMany({
      include: {
        contracts: {
          include: {
            departments: {
              include: {
                services: true,
              },
            },
          },
        },
      },
    });
    return companies;
  }

  @Post('/create')
  async createCompany(@Body() createCompanyDto: CreateCompanyDto) {
    const { nickname, trade_name, legal_name, cnpj, uf, city, logo } =
      createCompanyDto;

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

  @Post('/delete/:id')
  async deleteCompany(@Param('id') id: string) {
    const company = await this.prismaService.company.findUnique({
      where: {
        company_id: id,
      },
      include: {
        contracts: {
          include: {
            departments: {
              include: {
                services: true,
              },
            },
          },
        },
      },
    });

    if (!company) {
      throw new BadRequestException(`Company with ID ${id} not found`, {
        cause: new Error(),
        description: `Company with ID ${id} not found`,
      });
    }

    await Promise.all(
      company.contracts.map(async (contract) => {
        await Promise.all(
          contract.departments.map(async (department) => {
            await this.prismaService.department.update({
              where: {
                department_id: department.department_id,
              },
              data: {
                services: {
                  disconnect: department.services.map((service) => ({
                    service_id: service.service_id,
                  })),
                },
              },
            });
          }),
        );
        await this.prismaService.contract.delete({
          where: {
            contract_id: contract.contract_id,
          },
        });
      }),
    );

    return await this.prismaService.company.delete({
      where: {
        company_id: id,
      },
    });
  }
}
