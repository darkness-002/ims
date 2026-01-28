
'use server';

import { revalidatePath } from 'next/cache';
import { StudentInput } from '@/lib/types';
import { studentService } from '@/lib/services/student.service';

export async function createStudent(data: StudentInput) {
  try {
    await studentService.createStudent(data);
    revalidatePath('/dashboard/department/students');
    return { success: true };
  } catch (error) {
    console.error('Failed to create student:', error);
    return { success: false, message: 'Failed to create student' };
  }
}

export async function updateStudent(id: string, data: StudentInput) {
  try {
    await studentService.updateStudent(id, data);
    revalidatePath('/dashboard/department/students');
    return { success: true };
  } catch (error) {
    console.error(`Failed to update student ${id}:`, error);
    return { success: false, message: 'Failed to update student' };
  }
}

export async function deleteStudent(id: string) {
  try {
    await studentService.deleteStudent(id);
    revalidatePath('/dashboard/department/students');
    return { success: true };
  } catch (error) {
    console.error(`Failed to delete student ${id}:`, error);
    return { success: false, message: 'Failed to delete student' };
  }
}
