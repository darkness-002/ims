"use client";

import { useState, useTransition } from "react";
import { Department, DepartmentInput } from "@/lib/types";
import {
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "@/app/actions/departments";
import { toast } from "sonner";

interface UseDepartmentOptions {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function useDepartment(options?: UseDepartmentOptions) {
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);

  const create = async (data: DepartmentInput) => {
    setIsLoading(true);
    try {
      const result = await createDepartment(data);
      if (result.success) {
        toast.success("Department created successfully");
        options?.onSuccess?.();
      } else {
        toast.error(result.message || "Failed to create department");
        options?.onError?.(result.message || "Failed to create department");
      }
      return result;
    } catch (error) {
      const message = error instanceof Error ? error.message : "An error occurred";
      toast.error(message);
      options?.onError?.(message);
      return { success: false, message };
    } finally {
      setIsLoading(false);
    }
  };

  const update = async (id: string, data: DepartmentInput) => {
    setIsLoading(true);
    try {
      const result = await updateDepartment(id, data);
      if (result.success) {
        toast.success("Department updated successfully");
        options?.onSuccess?.();
      } else {
        toast.error(result.message || "Failed to update department");
        options?.onError?.(result.message || "Failed to update department");
      }
      return result;
    } catch (error) {
      const message = error instanceof Error ? error.message : "An error occurred";
      toast.error(message);
      options?.onError?.(message);
      return { success: false, message };
    } finally {
      setIsLoading(false);
    }
  };

  const remove = async (id: string) => {
    setIsLoading(true);
    try {
      const result = await deleteDepartment(id);
      if (result.success) {
        toast.success("Department deleted successfully");
        options?.onSuccess?.();
      } else {
        toast.error(result.message || "Failed to delete department");
        options?.onError?.(result.message || "Failed to delete department");
      }
      return result;
    } catch (error) {
      const message = error instanceof Error ? error.message : "An error occurred";
      toast.error(message);
      options?.onError?.(message);
      return { success: false, message };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    create,
    update,
    remove,
    isLoading,
    isPending,
  };
}

/**
 * Hook for managing department list with filtering
 */
export function useDepartmentList(
  departments: (Department & { institutionName?: string })[]
) {
  const [searchQuery, setSearchQuery] = useState("");
  const [institutionFilter, setInstitutionFilter] = useState<string>("all");
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);

  const filteredDepartments = departments.filter((department) => {
    // Filter by institution
    if (institutionFilter !== "all" && department.institutionId !== institutionFilter) {
      return false;
    }

    // Filter by search query
    if (!searchQuery) return true;

    const query = searchQuery.toLowerCase();
    return (
      department.name.toLowerCase().includes(query) ||
      department.code?.toLowerCase().includes(query) ||
      department.institutionName?.toLowerCase().includes(query)
    );
  });

  const getDepartmentStats = (department: Department) => {
    return {
      teacherCount: department.teachers?.length || 0,
      programCount: department.programs?.length || 0,
    };
  };

  const groupByInstitution = () => {
    return filteredDepartments.reduce((acc, dept) => {
      const institutionId = dept.institutionId;
      if (!acc[institutionId]) {
        acc[institutionId] = [];
      }
      acc[institutionId].push(dept);
      return acc;
    }, {} as Record<string, typeof departments>);
  };

  return {
    searchQuery,
    setSearchQuery,
    institutionFilter,
    setInstitutionFilter,
    selectedDepartment,
    setSelectedDepartment,
    filteredDepartments,
    getDepartmentStats,
    groupByInstitution,
  };
}
export default useDepartment;