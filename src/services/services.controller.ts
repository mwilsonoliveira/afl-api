import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { PrismaService } from 'src/database/prisma.service';
import { randomUUID } from 'node:crypto';

@Controller('services')
export class ServicesController {
  constructor(private prismaService: PrismaService) {}

  @Post('/create')
  async create(@Body() createServiceDto: CreateServiceDto) {
    const { name } = createServiceDto;

    const service = await this.prismaService.service.create({
      data: {
        service_id: randomUUID(),
        name,
      },
    });

    return service;
  }

  @Get()
  async getAllServices() {
    const services = await this.prismaService.service.findMany();
    return services;
  }

  @Get(':id')
  async getService(@Param('id') id: string) {
    const service = await this.prismaService.service.findUnique({
      where: {
        service_id: id,
      },
    });

    return service;
  }

  @Delete(':id')
  async deleteService(@Param('id') id: string) {
    const service = await this.prismaService.service.delete({
      where: {
        service_id: id,
      },
    });

    return service;
  }
}
