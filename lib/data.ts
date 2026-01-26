
import { PrismaClient } from '@prisma/client';
import { Institution, Shift, Program, Department, Teacher } from './types';

const prisma = new PrismaClient();

// ============================================================================
// DATA ACCESS FUNCTIONS
// ============================================================================

export async function getInstitutions(): Promise<Institution[]> {
    const institutions = await prisma.institution.findMany({
        include: {
            shifts: true,
            programs: true,
            departments: {
                include: {
                    teachers: true,
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
            programs: true,
            departments: {
                include: {
                    teachers: true,
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
        },
    });
    return departments;
}

export async function getDepartmentById(id: string): Promise<Department | null> {
    const department = await prisma.department.findUnique({
        where: { id },
        include: {
            teachers: true,
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
