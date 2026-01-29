"use server";

import { revalidatePath } from "next/cache";
import { ShiftInput } from "@/lib/types";

import { shiftService } from "@/lib/services/shift.service";

export async function createShift(data: ShiftInput) {
  try {
    await shiftService.createShift(data);
    revalidatePath("/shifts");
    return { success: true };
  } catch (error) {
    console.error("Failed to create shift:", error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : "Failed to create shift" 
    };
  }
}

export async function updateShift(id: string, data: ShiftInput) {
  try {
    await shiftService.updateShift(id, data);
    revalidatePath("/shifts");
    return { success: true };
  } catch (error) {
    console.error(`Failed to update shift ${id}:`, error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : "Failed to update shift" 
    };
  }
}

export async function deleteShift(id: string) {
  try {
    await shiftService.deleteShift(id);
    revalidatePath("/shifts");
    return { success: true };
  } catch (error) {
    console.error(`Failed to delete shift ${id}:`, error);
    return { success: false, message: "Failed to delete shift" };
  }
}