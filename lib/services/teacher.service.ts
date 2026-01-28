import prisma from '@/lib/db';
import { Teacher, TeacherInput } from '@/lib/types';

export class TeacherService {
  async findAllTeachers(): Promise<Teacher[]> {
    return await prisma.teacher.findMany({
      orderBy: [{ lastName: 'asc' }, { firstName: 'asc' }],
    });
  }

  async findTeacherById(id: string): Promise<Teacher | null> {
    return await prisma.teacher.findUnique({
      where: { id },
    });
  }

  async findTeachersByDepartment(departmentId: string): Promise<Teacher[]> {
    return await prisma.teacher.findMany({
      where: { departmentId },
      orderBy: [{ lastName: 'asc' }, { firstName: 'asc' }],
    });
  }

  async countTeachersByDepartment(departmentId: string): Promise<number> {
    return await prisma.teacher.count({
      where: { departmentId },
    });
  }

  async createTeacher(data: TeacherInput): Promise<Teacher> {
    return await prisma.teacher.create({ data });
  }

  async updateTeacher(id: string, data: TeacherInput): Promise<Teacher> {
    return await prisma.teacher.update({
      where: { id },
      data,
    });
  }

  async deleteTeacher(id: string): Promise<void> {
    await prisma.teacher.delete({ where: { id } });
  }

  async isTeacherEmailUnique(
    email: string,
    institutionId: string,
    excludeId?: string
  ): Promise<boolean> {
    const count = await prisma.teacher.count({
      where: {
        email,
        institutionId,
        id: excludeId ? { not: excludeId } : undefined,
      },
    });
    return count === 0;
  }
}

export const teacherService = new TeacherService();