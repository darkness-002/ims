
'use server';

import { revalidatePath } from 'next/cache';
import { PrismaClient } from '@prisma/client';
import { InstitutionInput } from '@/lib/types';

const prisma = new PrismaClient();

// ============================================================================
// SERVER ACTIONS
// ============================================================================

export async function createInstitution(data: InstitutionInput) {
  try {
    await prisma.institution.create({ data });
    revalidatePath('/institutions'); // Re-renders the page
    return { success: true };
  } catch (error) {
    console.error('Failed to create institution:', error);
    return { success: false, message: 'Failed to create institution' };
  }
}

export async function updateInstitution(id: string, data: InstitutionInput) {
  try {
    await prisma.institution.update({ where: { id }, data });
    revalidatePath('/institutions');
    return { success: true };
  } catch (error) {
    console.error(`Failed to update institution ${id}:`, error);
    return { success: false, message: 'Failed to update institution' };
  }
}

export async function deleteInstitution(id: string) {
  try {
    await prisma.institution.delete({ where: { id } });
    revalidatePath('/institutions');
    return { success: true };
  } catch (error) {
    console.error(`Failed to delete institution ${id}:`, error);
    return { success: false, message: 'Failed to delete institution' };
  }
}
