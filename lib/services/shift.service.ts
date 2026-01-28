import prisma from '@/lib/db';
import { Shift, ShiftInput } from '@/lib/types';

export class ShiftService {
  async findAllShifts(): Promise<Shift[]> {
    return await prisma.shift.findMany({
      orderBy: { startTime: 'asc' },
    });
  }

  async findShiftById(id: string): Promise<Shift | null> {
    return await prisma.shift.findUnique({
      where: { id },
    });
  }

  async findShiftsByInstitution(institutionId: string): Promise<Shift[]> {
    return await prisma.shift.findMany({
      where: { institutionId },
      orderBy: { startTime: 'asc' },
    });
  }

  async createShift(data: ShiftInput): Promise<Shift> {
    return await prisma.shift.create({ data });
  }

  async updateShift(id: string, data: ShiftInput): Promise<Shift> {
    return await prisma.shift.update({
      where: { id },
      data,
    });
  }

  async deleteShift(id: string): Promise<void> {
    await prisma.shift.delete({ where: { id } });
  }

  async shiftHasOverlap(
    startTime: string,
    endTime: string,
    institutionId: string,
    excludeId?: string
  ): Promise<boolean> {
    const shifts = await prisma.shift.findMany({
      where: {
        institutionId,
        id: excludeId ? { not: excludeId } : undefined,
      },
    });

    return shifts.some((shift) => {
      return (
        (startTime >= shift.startTime && startTime < shift.endTime) ||
        (endTime > shift.startTime && endTime <= shift.endTime) ||
        (startTime <= shift.startTime && endTime >= shift.endTime)
      );
    });
  }
}

export const shiftService = new ShiftService();