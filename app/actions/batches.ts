'use server';

import { revalidatePath } from 'next/cache';
import { BatchInput } from '@/lib/types';
import { batchService } from '@/lib/services/batch.service';

export async function createBatch(data: BatchInput) {
  try {
    const batch = await batchService.createBatch(data);
    revalidatePath('/dashboard/department/batches');
    return { success: true, batch };
  } catch (error) {
    console.error('Failed to create batch:', error);
    return { success: false, message: 'Failed to create batch' };
  }
}

export async function updateBatch(id: string, data: BatchInput) {
  try {
    const batch = await batchService.updateBatch(id, data);
    revalidatePath('/dashboard/department/batches');
    return { success: true, batch };
  } catch (error) {
    console.error(`Failed to update batch ${id}:`, error);
    return { success: false, message: 'Failed to update batch' };
  }
}

export async function deleteBatch(id: string) {
  try {
    await batchService.deleteBatch(id);
    revalidatePath('/dashboard/department/batches');
    return { success: true };
  } catch (error) {
    console.error(`Failed to delete batch ${id}:`, error);
    return { success: false, message: 'Failed to delete batch' };
  }
}