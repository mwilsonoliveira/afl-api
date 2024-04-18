import { Body, Controller, Post } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { PrismaService } from 'src/database/prisma.service';
import { CreateContract } from 'src/dtos/contract/create-contract';

@Controller('contract')
export class ContractController {
  constructor(private prismaService: PrismaService) {}

  @Post()
  async createContract(@Body() body: CreateContract) {
    const { effective_date, sign_date, contract_tax, company_id, service_id } =
      body;

    const contract = await this.prismaService.contracts.create({
      data: {
        contract_id: randomUUID(),
        effective_date,
        sign_date,
        contract_tax,
        company: { connect: { company_id } },
        service: { connect: { service_id } },
      },
    });

    return contract;
  }
}
