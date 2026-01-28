import prisma from '@/lib/db';
import { Batch, BatchInput } from '@/lib/types';

export class BatchService {
  async findAllBatches(): Promise<Batch[]> {
    return await prisma.batch.findMany({
      include: {
        program: true,
      },
      orderBy: { startDate: 'desc' },
    });
  }

  async findBatchById(id: string): Promise<Batch | null> {
    return await prisma.batch.findUnique({
      where: { id },
      include: {
        program: true,
      },
    });
  }

  async findBatchesByDepartment(departmentId: string): Promise<Batch[]> {
    return await prisma.batch.findMany({
      where: {
        program: {
          departmentId,
        },
      },
      include: {
        program: true,
      },
      orderBy: { startDate: 'desc' },
    });
  }

  async findBatchesByProgram(programId: string): Promise<Batch[]> {
    return await prisma.batch.findMany({
      where: { programId },
      include: {
        program: true,
      },
      orderBy: { startDate: 'desc' },
    });
  }

  async findActiveBatches(): Promise<Batch[]> {
    return await prisma.batch.findMany({
      where: { isActive: true },
      include: {
        program: true,
      },
      orderBy: { startDate: 'desc' },
    });
  }

  async countBatchesByProgram(programId: string): Promise<number> {
    return await prisma.batch.count({
      where: { programId },
    });
  }

  async createBatch(data: BatchInput): Promise<Batch> {
    return await prisma.batch.create({
      data,
      include: {
        program: true,
      },
    });
  }

  async updateBatch(id: string, data: BatchInput): Promise<Batch> {
    return await prisma.batch.update({
      where: { id },
      data,
      include: {
        program: true,
      },
    });
  }

  async deleteBatch(id: string): Promise<void> {
    await prisma.batch.delete({ where: { id } });
  }
}

export const batchService = new BatchService();