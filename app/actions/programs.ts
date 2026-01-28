
'use server';

import { revalidatePath } from 'next/cache';
import { ProgramInput } from '@/lib/types';
import { programService } from '@/lib/services/program.service';

// ============================================================================
// SERVER ACTIONS
// ============================================================================

export async function createProgram(data: ProgramInput) {
  try {
    await programService.createProgram(data);
    revalidatePath('/programs');
    return { success: true };
  } catch (error) {
    console.error('Failed to create program:', error);
    return { success: false, message: 'Failed to create program' };
  }
}

export async function updateProgram(id: string, data: ProgramInput) {
  try {
    await programService.updateProgram(id, data);
    revalidatePath('/programs');
    return { success: true };
  } catch (error) {
    console.error(`Failed to update program ${id}:`, error);
    return { success: false, message: 'Failed to update program' };
  }
}

export async function deleteProgram(id: string) {
  try {
    await programService.deleteProgram(id);
    revalidatePath('/programs');
    return { success: true };
  } catch (error) {
    console.error(`Failed to delete program ${id}:`, error);
    return { success: false, message: 'Failed to delete program' };
  }
}
