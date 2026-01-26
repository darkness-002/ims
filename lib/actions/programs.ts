
'use server';

import { revalidatePath } from 'next/cache';
import { PrismaClient } from '@prisma/client';
import { ProgramInput } from '@/lib/types';

const prisma = new PrismaClient();

// ============================================================================
// SERVER ACTIONS
// ============================================================================

export async function createProgram(data: ProgramInput) {
  try {
    await prisma.program.create({ data });
    revalidatePath('/programs');
    return { success: true };
  } catch (error) {
    console.error('Failed to create program:', error);
    return { success: false, message: 'Failed to create program' };
  }
}

export async function updateProgram(id: string, data: ProgramInput) {
  try {
    await prisma.program.update({ where: { id }, data });
    revalidatePath('/programs');
    return { success: true };
  } catch (error) {
    console.error(`Failed to update program ${id}:`, error);
    return { success: false, message: 'Failed to update program' };
  }
}

export async function deleteProgram(id: string) {
  try {
    await prisma.program.delete({ where: { id } });
    revalidatePath('/programs');
    return { success: true };
  } catch (error) {
    console.error(`Failed to delete program ${id}:`, error);
    return { success: false, message: 'Failed to delete program' };
  }
}
