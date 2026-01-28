import prisma from '@/lib/db';
import { Institution, Shift, Program, Department, Teacher, Student, Batch } from './types';
import {
  institutionService,
  departmentService,
  programService,
  shiftService,
  teacherService,
  batchService,
  studentService,
} from '@/lib/services';



export async function getInstitutions(): Promise<Institution[]> {
    return await institutionService.findAllInstitutions();
}

export async function getInstitutionById(id: string): Promise<Institution | null> {
    return await institutionService.findInstitutionById(id);
}

export async function getDepartments(): Promise<Department[]> {
    return await departmentService.findAllDepartments();
}

export async function getDepartmentById(id: string): Promise<Department | null> {
    return await departmentService.findDepartmentById(id);
}

export async function getPrograms(): Promise<Program[]> {
    return await programService.findAllPrograms();
}

export async function getProgramById(id: string): Promise<Program | null> {
    return await programService.findProgramById(id);
}

export async function getShifts(): Promise<Shift[]> {
    return await shiftService.findAllShifts();
}

export async function getShiftById(id: string): Promise<Shift | null> {
    return await shiftService.findShiftById(id);
}

export async function getTeachers(): Promise<Teacher[]> {
    return await teacherService.findAllTeachers();
}

export async function getTeacherById(id: string): Promise<Teacher | null> {
    return await teacherService.findTeacherById(id);
}

export async function getTeachersByDepartment(departmentId: string): Promise<Teacher[]> {
    return await teacherService.findTeachersByDepartment(departmentId);
}

export async function getTotalStudents(): Promise<number> {
    return await prisma.student.count();
}

export async function getStudentsByDepartmentCount(departmentId: string): Promise<number> {
    return await studentService.countStudentsByDepartment(departmentId);
}

export async function getProgramsByDepartment(departmentId: string): Promise<Program[]> {
    return await programService.findProgramsByDepartment(departmentId);
}

export async function getBatchesByDepartment(departmentId: string): Promise<Batch[]> {
    return await batchService.findBatchesByDepartment(departmentId);
}

export async function getStudentsByDepartment(departmentId: string): Promise<Student[]> {
    return await studentService.findStudentsByDepartment(departmentId);
}

export async function getSubjects(institutionId: string) {
    return await prisma.subject.findMany({
        where: { institutionId },
        orderBy: { code: 'asc' },
    });
}

export async function getProgramCurriculum(programId: string) {
    return await prisma.programSubject.findMany({
        where: { programId },
        include: {
            subject: true,
        },
        orderBy: { termNumber: 'asc' },
    });
}