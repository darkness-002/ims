
'use server';

import { revalidatePath } from 'next/cache';
import { PrismaClient } from '@prisma/client';
import { ShiftInput } from '@/lib/types';

const prisma = new PrismaClient();

// ============================================================================
// SERVER ACTIONS
// ============================================================================

export async function createShift(data: ShiftInput) {
  try {
    await prisma.shift.create({ data });
    revalidatePath('/shifts');
    return { success: true };
  } catch (error) {
    console.error('Failed to create shift:', error);
    return { success: false, message: 'Failed to create shift' };
  }
}

export async function updateShift(id: string, data: ShiftInput) {
  try {
    await prisma.shift.update({ where: { id }, data });
    revalidatePath('/shifts');
    return { success: true };
  } catch (error) {
    console.error(`Failed to update shift ${id}:`, error);
    return { success: false, message: 'Failed to update shift' };
  }
}

export async function deleteShift(id: string) {
  try {
    await prisma.shift.delete({ where: { id } });
    revalidatePath('/shifts');
    return { success: true };
  } catch (error) {
    console.error(`Failed to delete shift ${id}:`, error);
    return { success: false, message: 'Failed to delete shift' };
  }
}
