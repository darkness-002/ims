import prisma from '@/lib/db';
import { Program, ProgramInput } from '@/lib/types';

export class ProgramService {
  async findAllPrograms(): Promise<Program[]> {
    return await prisma.program.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async findProgramById(id: string): Promise<Program | null> {
    return await prisma.program.findUnique({
      where: { id },
    });
  }

  async findProgramsByDepartment(departmentId: string): Promise<Program[]> {
    return await prisma.program.findMany({
      where: { departmentId },
      orderBy: { name: 'asc' },
    });
  }

  async createProgram(data: ProgramInput): Promise<Program> {
    return await prisma.program.create({ data });
  }

  async updateProgram(id: string, data: ProgramInput): Promise<Program> {
    return await prisma.program.update({
      where: { id },
      data,
    });
  }

  async deleteProgram(id: string): Promise<void> {
    await prisma.program.delete({ where: { id } });
  }
}

export const programService = new ProgramService();