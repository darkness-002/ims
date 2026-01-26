
'use server';

import { revalidatePath } from 'next/cache';
import { PrismaClient } from '@prisma/client';
import { DepartmentInput } from '@/lib/types';

const prisma = new PrismaClient();

// ============================================================================
// SERVER ACTIONS
// ============================================================================

export async function createDepartment(data: DepartmentInput) {
  try {
    await prisma.department.create({ data });
    revalidatePath('/departments');
    return { success: true };
  } catch (error) {
    console.error('Failed to create department:', error);
    return { success: false, message: 'Failed to create department' };
  }
}

export async function updateDepartment(id: string, data: DepartmentInput) {
  try {
    await prisma.department.update({ where: { id }, data });
    revalidatePath('/departments');
    return { success: true };
  } catch (error) {
    console.error(`Failed to update department ${id}:`, error);
    return { success: false, message: 'Failed to update department' };
  }
}

export async function deleteDepartment(id: string) {
  try {
    await prisma.department.delete({ where: { id } });
    revalidatePath('/departments');
    return { success: true };
  } catch (error) {
    console.error(`Failed to delete department ${id}:`, error);
    return { success: false, message: 'Failed to delete department' };
  }
}
