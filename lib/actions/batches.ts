
'use server';

import { revalidatePath } from 'next/cache';
import { PrismaClient } from '@prisma/client';
import { BatchInput } from '@/lib/types';

const prisma = new PrismaClient();

export async function createBatch(data: BatchInput) {
  try {
    const batch = await prisma.batch.create({ data });
    // We don't have a single "batches" page, usually inside department dashboard
    // We'll revalidate the department dashboard path or where it's used
    revalidatePath('/dashboard/department/batches'); 
    return { success: true, batch };
  } catch (error) {
    console.error('Failed to create batch:', error);
    return { success: false, message: 'Failed to create batch' };
  }
}

export async function updateBatch(id: string, data: BatchInput) {
  try {
    const batch = await prisma.batch.update({ where: { id }, data });
    revalidatePath('/dashboard/department/batches');
    return { success: true, batch };
  } catch (error) {
    console.error(`Failed to update batch ${id}:`, error);
    return { success: false, message: 'Failed to update batch' };
  }
}

export async function deleteBatch(id: string) {
  try {
    await prisma.batch.delete({ where: { id } });
    revalidatePath('/dashboard/department/batches');
    return { success: true };
  } catch (error) {
    console.error(`Failed to delete batch ${id}:`, error);
    return { success: false, message: 'Failed to delete batch' };
  }
}
