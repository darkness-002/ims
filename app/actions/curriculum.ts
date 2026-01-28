
'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/db';

// Add a subject to a program's term
export async function addSubjectToCurriculum(
  programId: string,
  subjectId: string,
  termNumber: number,
  isElective: boolean = false
) {
  try {
    await prisma.programSubject.create({
      data: {
        programId,
        subjectId,
        termNumber,
        isElective,
      },
    });
    revalidatePath(`/programs/${programId}`);
    return { success: true };
  } catch (error) {
    console.error('Failed to add subject to curriculum:', error);
    return { success: false, message: 'Failed to add subject' };
  }
}

// Remove a subject from a program's term
export async function removeSubjectFromCurriculum(programSubjectId: string, programId: string) {
  try {
    await prisma.programSubject.delete({
      where: { id: programSubjectId },
    });
    revalidatePath(`/programs/${programId}`);
    return { success: true };
  } catch (error) {
    console.error('Failed to remove subject from curriculum:', error);
    return { success: false, message: 'Failed to remove subject' };
  }
}

// Create a new Subject (Global Pool)
export async function createSubject(data: { name: string; code: string; credits: number; institutionId: string }) {
  try {
    const subject = await prisma.subject.create({ data });
    return { success: true, subject };
  } catch (error) {
    console.error('Failed to create subject:', error);
    return { success: false, message: 'Failed to create subject' };
  }
}
