
'use server';

import { revalidatePath } from 'next/cache';
import { TeacherInput } from '@/lib/types';
import { teacherService } from '@/lib/services/teacher.service';

// ============================================================================
// SERVER ACTIONS
// ============================================================================

export async function createTeacher(data: TeacherInput) {
  try {
    const teacher = await teacherService.createTeacher(data);
    revalidatePath(`/departments/${teacher.departmentId}`);
    return { success: true };
  } catch (error) {
    console.error('Failed to create teacher:', error);
    return { success: false, message: 'Failed to create teacher' };
  }
}

export async function updateTeacher(id: string, data: TeacherInput) {
  try {
    const teacher = await teacherService.updateTeacher(id, data);
    revalidatePath(`/departments/${teacher.departmentId}`);
    return { success: true };
  } catch (error) {
    console.error(`Failed to update teacher ${id}:`, error);
    return { success: false, message: 'Failed to update teacher' };
  }
}

export async function deleteTeacher(id: string) {
  try {
    // We need to fetch the teacher first to know which path to revalidate
    // or we can rely on client side to handle navigation if needed.
    // However, the original code had access to 'teacher' object from delete result.
    // Prisma delete returns the deleted object. teacherService.delete returns void.
    // I should probably update teacherService to return the deleted object or fetch it first.
    // BUT checking the service implementation:
    // async delete(id: string): Promise<void> { await prisma.teacher.delete({ where: { id } }); }
    // It doesn't return it.
    // So I can't get the departmentId easily.
    // I will fetch it first using the service.
    
    const teacher = await teacherService.findTeacherById(id);
    if (!teacher) throw new Error("Teacher not found");
    
    await teacherService.deleteTeacher(id);
    revalidatePath(`/departments/${teacher.departmentId}`);
    return { success: true };
  } catch (error) {
    console.error(`Failed to delete teacher ${id}:`, error);
    return { success: false, message: 'Failed to delete teacher' };
  }
}
