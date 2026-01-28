
'use server';

import { revalidatePath } from 'next/cache';
import { PrismaClient } from '@prisma/client';
import { StudentInput } from '@/lib/types';

const prisma = new PrismaClient();

export async function createStudent(data: StudentInput) {
  try {
    await prisma.student.create({ data });
    revalidatePath('/dashboard/department/students');
    return { success: true };
  } catch (error) {
    console.error('Failed to create student:', error);
    return { success: false, message: 'Failed to create student' };
  }
}

export async function updateStudent(id: string, data: StudentInput) {
  try {
    await prisma.student.update({ where: { id }, data });
    revalidatePath('/dashboard/department/students');
    return { success: true };
  } catch (error) {
    console.error(`Failed to update student ${id}:`, error);
    return { success: false, message: 'Failed to update student' };
  }
}

export async function deleteStudent(id: string) {
  try {
    await prisma.student.delete({ where: { id } });
    revalidatePath('/dashboard/department/students');
    return { success: true };
  } catch (error) {
    console.error(`Failed to delete student ${id}:`, error);
    return { success: false, message: 'Failed to delete student' };
  }
}
