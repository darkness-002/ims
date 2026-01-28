import prisma from '@/lib/db';
import { Institution, InstitutionInput } from '@/lib/types';

export class InstitutionService {
  async findAllInstitutions(): Promise<Institution[]> {
    return await prisma.institution.findMany({
      include: {
        shifts: true,
        departments: {
          include: {
            teachers: true,
            programs: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findInstitutionById(id: string): Promise<Institution | null> {
    return await prisma.institution.findUnique({
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
  }

  async createInstitution(data: InstitutionInput): Promise<Institution> {
    return await prisma.institution.create({ data });
  }

  async updateInstitution(id: string, data: InstitutionInput): Promise<Institution> {
    return await prisma.institution.update({
      where: { id },
      data,
    });
  }

  async deleteInstitution(id: string): Promise<void> {
    await prisma.institution.delete({ where: { id } });
  }

  async institutionExists(id: string): Promise<boolean> {
    const count = await prisma.institution.count({ where: { id } });
    return count > 0;
  }
}

export const institutionService = new InstitutionService();