import { Body, Controller, Post } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { PrismaService } from 'src/database/prisma.service';
import { CreateContract, Department } from 'src/dtos/contract/create-contract';

@Controller('contract')
export class ContractController {
  constructor(private prismaService: PrismaService) {}

  @Post('create')
  async createContract(@Body() body: CreateContract) {
    const {
      status,
      value,
      effective_date,
      sign_date,
      contract_tax,
      company_id,
      departments,
    } = body;

    // Criar os departamentos e os serviços associados
    const departmentData = departments.map((department: Department) => ({
      department_id: randomUUID(),
      name: department.name,
      services: {
        create: department.services.map((serviceName) => ({
          service_id: randomUUID(),
          name: serviceName,
        })),
      },
    }));

    // Criar o contrato com os departamentos e serviços associados
    const contract = await this.prismaService.contracts.create({
      data: {
        contract_id: randomUUID(),
        status,
        value,
        effective_date,
        sign_date,
        contract_tax,
        company: { connect: { company_id } },
        departments: {
          create: departmentData,
        },
      },
    });

    return contract;
  }
}
