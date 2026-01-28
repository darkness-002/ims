
import { PrismaClient } from '@prisma/client';
import { Institution, Shift, Program, Department, Teacher, Student, Batch } from './types';

const prisma = new PrismaClient();

// ============================================================================
// DATA ACCESS FUNCTIONS
// ============================================================================

export async function getInstitutions(): Promise<Institution[]> {
    const institutions = await prisma.institution.findMany({
        include: {
            shifts: true,
            departments: {
                include: {
                    teachers: true,
                    programs: true,
                },
            },
        },
    });
    return institutions;
}

export async function getInstitutionById(id: string): Promise<Institution | null> {
    const institution = await prisma.institution.findUnique({
        where: { id },
        include: {
            shifts: true,
            departments: {
                include: {
                    teachers: true,
                    programs: true,
                },
            },
        },
    });
    return institution;
}

export async function getDepartments(): Promise<Department[]> {
    const departments = await prisma.department.findMany({
        include: {
            teachers: true,
            programs: true,
        },
    });
    return departments;
}

export async function getDepartmentById(id: string): Promise<Department | null> {
    const department = await prisma.department.findUnique({
        where: { id },
        include: {
            teachers: true,
            programs: true,
        },
    });
    return department;
}

export async function getPrograms(): Promise<Program[]> {
    const programs = await prisma.program.findMany();
    return programs;
}

export async function getProgramById(id: string): Promise<Program | null> {
    const program = await prisma.program.findUnique({
        where: { id },
    });
    return program;
}

export async function getShifts(): Promise<Shift[]> {
    const shifts = await prisma.shift.findMany();
    return shifts;
}

export async function getShiftById(id: string): Promise<Shift | null> {
    const shift = await prisma.shift.findUnique({
        where: { id },
    });
    return shift;
}

export async function getTeachers(): Promise<Teacher[]> {
    const teachers = await prisma.teacher.findMany();
    return teachers;
}

export async function getTeacherById(id: string): Promise<Teacher | null> {
    const teacher = await prisma.teacher.findUnique({
        where: { id },
    });
    return teacher;
}

export function getTeachersByDepartment(departmentId: string): Promise<Teacher[]> {
    const teachers = prisma.teacher.findMany({
        where: { departmentId },
    });
    return teachers;
}

export async function getTotalStudents(): Promise<number> {
    return await prisma.student.count();
}

export async function getStudentsByDepartmentCount(departmentId: string): Promise<number> {
    return await prisma.student.count({
        where: {
            batch: {
                program: {
                    departmentId: departmentId
                }
            }
        }
    });
}

export async function getProgramsByDepartment(departmentId: string): Promise<Program[]> {
    return await prisma.program.findMany({
        where: { departmentId },
    });
}

export async function getBatchesByDepartment(departmentId: string): Promise<Batch[]> {
    return await prisma.batch.findMany({
        where: {
            program: {
                departmentId: departmentId,
            },
        },
        include: {
            program: true,
        },
    });
}

export async function getStudentsByDepartment(departmentId: string): Promise<Student[]> {
    return await prisma.student.findMany({
        where: {
            batch: {
                program: {
                    departmentId: departmentId,
                },
            },
        },
        include: {
            batch: {
                include: {
                    program: true,
                },
            },
        },
    });
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
