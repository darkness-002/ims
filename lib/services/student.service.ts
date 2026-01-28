import prisma from '@/lib/db';
import { Student, StudentInput } from '@/lib/types';

export class StudentService {
  async findAllStudents(): Promise<Student[]> {
    return await prisma.student.findMany({
      include: {
        batch: {
          include: {
            program: true,
          },
        },
      },
      orderBy: { rollNumber: 'asc' },
    });
  }

  async findStudentById(id: string): Promise<Student | null> {
    return await prisma.student.findUnique({
      where: { id },
      include: {
        batch: {
          include: {
            program: true,
          },
        },
      },
    });
  }

  async findStudentsByDepartment(departmentId: string): Promise<Student[]> {
    return await prisma.student.findMany({
      where: {
        batch: {
          program: {
            departmentId,
          },
        },
      },
      include: {
        batch: {
          include: {
            program: true,
          },
        },
      },
      orderBy: { rollNumber: 'asc' },
    });
  }

  async findStudentsByBatch(batchId: string): Promise<Student[]> {
    return await prisma.student.findMany({
      where: { batchId },
      include: {
        batch: {
          include: {
            program: true,
          },
        },
      },
      orderBy: { rollNumber: 'asc' },
    });
  }

  async countStudentsByDepartment(departmentId: string): Promise<number> {
    return await prisma.student.count({
      where: {
        batch: {
          program: {
            departmentId,
          },
        },
      },
    });
  }

  async countStudentsByBatch(batchId: string): Promise<number> {
    return await prisma.student.count({
      where: { batchId },
    });
  }

  async createStudent(data: StudentInput): Promise<Student> {
    return await prisma.student.create({
      data,
      include: {
        batch: {
          include: {
            program: true,
          },
        },
      },
    });
  }

  async updateStudent(id: string, data: StudentInput): Promise<Student> {
    return await prisma.student.update({
      where: { id },
      data,
      include: {
        batch: {
          include: {
            program: true,
          },
        },
      },
    });
  }

  async deleteStudent(id: string): Promise<void> {
    await prisma.student.delete({ where: { id } });
  }

  async isStudentRollNumberUnique(
    rollNumber: string,
    institutionId: string,
    excludeId?: string
  ): Promise<boolean> {
    const count = await prisma.student.count({
      where: {
        rollNumber,
        institutionId,
        id: excludeId ? { not: excludeId } : undefined,
      },
    });
    return count === 0;
  }
}

export const studentService = new StudentService();