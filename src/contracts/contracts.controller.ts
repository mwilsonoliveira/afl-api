import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { CreateContractDto } from './dto/create-contract.dto';
import { PrismaService } from 'src/database/prisma.service';
import { randomUUID } from 'node:crypto';

@Controller('contracts')
export class ContractsController {
  constructor(private prismaService: PrismaService) {}

  @Get('/:id')
  async getContract(@Param('id') id: string) {
    const contract = await this.prismaService.contract.findUnique({
      where: {
        contract_id: id,
      },
    });

    return contract;
  }

  @Get()
  async getAllContracts() {
    const contracts = await this.prismaService.contract.findMany();
    return contracts;
  }

  @Post('/create')
  async createContract(@Body() createContractDto: CreateContractDto) {
    const {
      value,
      status,
      sign_date,
      effective_date,
      contract_tax,
      company_id,
      departments,
    } = createContractDto;

    const contract = await this.prismaService.contract.create({
      data: {
        contract_id: randomUUID(),
        value,
        status,
        sign_date,
        effective_date,
        contract_tax,
        company: { connect: { company_id } },
        departments: {
          connect: departments.map(({ department_id }) => ({ department_id })),
        },
      },
      include: {
        departments: {
          include: {
            services: true,
          },
        },
      },
    });

    for (const department of departments) {
      const { department_id, services } = department;
      await this.prismaService.department.update({
        where: { department_id },
        data: {
          services: {
            connect: services.map(({ service_id }) => ({ service_id })),
          },
        },
      });
    }

    return contract;
  }

  @Post('/delete/:id')
  async deleteContract(@Param('id') id: string) {
    const contract = await this.prismaService.contract.findUnique({
      where: {
        contract_id: id,
      },
      include: {
        departments: {
          include: {
            services: true,
          },
        },
      },
    });

    if (!contract) {
      throw new BadRequestException(`Contract with ID ${id} not found`, {
        cause: new Error(),
        description: `Contract with ID ${id} not found`,
      });
    }

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

    return this.prismaService.contract.delete({
      where: {
        contract_id: id,
      },
    });
  }
}
