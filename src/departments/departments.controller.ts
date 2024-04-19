import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { PrismaService } from 'src/database/prisma.service';
import { randomUUID } from 'node:crypto';

@Controller('departments')
export class DepartmentsController {
  constructor(private prismaService: PrismaService) {}

  @Get()
  async getAllDepartments() {
    const departments = await this.prismaService.department.findMany();
    return departments;
  }

  @Get(':id')
  async getDepartment(@Param('id') id: string) {
    const department = await this.prismaService.department.findUnique({
      where: {
        department_id: id,
      },
    });

    if (!department) {
      throw new BadRequestException(`Department with ID ${id} not found`, {
        cause: new Error(),
        description: `Department with ID ${id} not found`,
      });
    }

    return department;
  }

  @Post('/create')
  async createDepartment(@Body() createDepartmentDto: CreateDepartmentDto) {
    const { name } = createDepartmentDto;
    const department = await this.prismaService.department.create({
      data: {
        department_id: randomUUID(),
        name,
      },
    });

    return department;
  }

  @Post('/delete/:id')
  async deleteDepartment(@Param('id') id: string) {
    const department = await this.prismaService.department.delete({
      where: {
        department_id: id,
      },
    });

    if (!department) {
      throw new BadRequestException(`Department with ID ${id} not found`, {
        cause: new Error(),
        description: `Department with ID ${id} not found`,
      });
    }

    return department;
  }
}
