"use server";

import { revalidatePath } from "next/cache";
import { InstitutionInput } from "@/lib/types";

import { institutionService } from "@/lib/services/institution.service";

export async function createInstitution(data: InstitutionInput) {
  try {
    await institutionService.createInstitution(data);
    revalidatePath("/institutions");
    return { success: true };
  } catch (error) {
    console.error("Failed to create institution:", error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : "Failed to create institution" 
    };
  }
}

export async function updateInstitution(id: string, data: InstitutionInput) {
  try {
    await institutionService.updateInstitution(id, data);
    revalidatePath("/institutions");
    revalidatePath(`/institutions/${id}`);
    return { success: true };
  } catch (error) {
    console.error(`Failed to update institution ${id}:`, error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : "Failed to update institution" 
    };
  }
}

export async function deleteInstitution(id: string) {
  try {
    await institutionService.deleteInstitution(id);
    revalidatePath("/institutions");
    return { success: true };
  } catch (error) {
    console.error(`Failed to delete institution ${id}:`, error);
    return { success: false, message: "Failed to delete institution" };
  }
}