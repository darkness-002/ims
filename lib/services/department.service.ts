import prisma from '@/lib/db';
import { Department, DepartmentInput } from '@/lib/types';

export class DepartmentService {
  async findAllDepartments(): Promise<Department[]> {
    return await prisma.department.findMany({
      include: {
        teachers: true,
        programs: true,
      },
      orderBy: { name: 'asc' },
    });
  }

  async findDepartmentById(id: string): Promise<Department | null> {
    return await prisma.department.findUnique({
      where: { id },
      include: {
        teachers: true,
        programs: true,
      },
    });
  }

  async findDepartmentsByInstitution(institutionId: string): Promise<Department[]> {
    return await prisma.department.findMany({
      where: { institutionId },
      include: {
        teachers: true,
        programs: true,
      },
      orderBy: { name: 'asc' },
    });
  }

  async createDepartment(data: DepartmentInput): Promise<Department> {
    return await prisma.department.create({ data });
  }

  async updateDepartment(id: string, data: DepartmentInput): Promise<Department> {
    return await prisma.department.update({
      where: { id },
      data,
    });
  }

  async deleteDepartment(id: string): Promise<void> {
    await prisma.department.delete({ where: { id } });
  }
}

export const departmentService = new DepartmentService();