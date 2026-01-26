
'use server';

import { revalidatePath } from 'next/cache';
import { PrismaClient } from '@prisma/client';
import { TeacherInput } from '@/lib/types';

const prisma = new PrismaClient();

// ============================================================================
// SERVER ACTIONS
// ============================================================================

export async function createTeacher(data: TeacherInput) {
  try {
    const teacher = await prisma.teacher.create({ data });
    revalidatePath(`/departments/${teacher.departmentId}`);
    return { success: true };
  } catch (error) {
    console.error('Failed to create teacher:', error);
    return { success: false, message: 'Failed to create teacher' };
  }
}

export async function updateTeacher(id: string, data: TeacherInput) {
  try {
    const teacher = await prisma.teacher.update({ where: { id }, data });
    revalidatePath(`/departments/${teacher.departmentId}`);
    return { success: true };
  } catch (error) {
    console.error(`Failed to update teacher ${id}:`, error);
    return { success: false, message: 'Failed to update teacher' };
  }
}

export async function deleteTeacher(id: string) {
  try {
    const teacher = await prisma.teacher.delete({ where: { id } });
    revalidatePath(`/departments/${teacher.departmentId}`);
    return { success: true };
  } catch (error) {
    console.error(`Failed to delete teacher ${id}:`, error);
    return { success: false, message: 'Failed to delete teacher' };
  }
}
