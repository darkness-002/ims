"use server";

import { revalidatePath } from "next/cache";
import { DepartmentInput } from "@/lib/types";

import { departmentService } from "@/lib/services/department.service";

export async function createDepartment(data: DepartmentInput) {
  try {
    const validated = departmentSchema.parse(data);
    
    await departmentService.createDepartment(validated);
    revalidatePath("/departments");
    revalidatePath(`/institutions/${data.institutionId}`);
    return { success: true };
  } catch (error) {
    console.error("Failed to create department:", error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : "Failed to create department" 
    };
  }
}

export async function updateDepartment(id: string, data: DepartmentInput) {
  try {
    const validated = departmentSchema.parse(data);
    
    await departmentService.updateDepartment(id, validated);
    revalidatePath("/departments");
    revalidatePath(`/institutions/${data.institutionId}`);
    return { success: true };
  } catch (error) {
    console.error(`Failed to update department ${id}:`, error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : "Failed to update department" 
    };
  }
}

export async function deleteDepartment(id: string) {
  try {
    await departmentService.deleteDepartment(id);
    revalidatePath("/departments");
    return { success: true };
  } catch (error) {
    console.error(`Failed to delete department ${id}:`, error);
    return { success: false, message: "Failed to delete department" };
  }
}