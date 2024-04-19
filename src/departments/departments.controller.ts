import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { PrismaService } from 'src/database/prisma.service';
import { randomUUID } from 'node:crypto';

@Controller('departments')
export class DepartmentsController {
  constructor(private prismaService: PrismaService) {}

  @Get('/:id')
  async getDepartment(@Param('id') id: string) {
    const department = await this.prismaService.department.findUnique({
      where: {
        department_id: id,
      },
    });

    return department;
  }

  @Get()
  async getAllDepartments() {
    const departments = await this.prismaService.department.findMany();
    return departments;
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

  @Delete(':id')
  async deleteDepartment(@Param('id') id: string) {
    const department = await this.prismaService.department.delete({
      where: {
        department_id: id,
      },
    });

    return department;
  }
}
