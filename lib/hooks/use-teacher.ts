"use client";

import { useState, useTransition } from "react";
import { Teacher, TeacherInput } from "@/lib/types";
import {
  createTeacher,
  updateTeacher,
  deleteTeacher,
} from "@/app/actions/teachers";
import { toast } from "sonner";

interface UseTeacherOptions {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function useTeacher(options?: UseTeacherOptions) {
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);

  const create = async (data: TeacherInput) => {
    setIsLoading(true);
    try {
      const result = await createTeacher(data);
      if (result.success) {
        toast.success("Teacher created successfully");
        options?.onSuccess?.();
      } else {
        toast.error(result.message || "Failed to create teacher");
        options?.onError?.(result.message || "Failed to create teacher");
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

  const update = async (id: string, data: TeacherInput) => {
    setIsLoading(true);
    try {
      const result = await updateTeacher(id, data);
      if (result.success) {
        toast.success("Teacher updated successfully");
        options?.onSuccess?.();
      } else {
        toast.error(result.message || "Failed to update teacher");
        options?.onError?.(result.message || "Failed to update teacher");
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
      const result = await deleteTeacher(id);
      if (result.success) {
        toast.success("Teacher deleted successfully");
        options?.onSuccess?.();
      } else {
        toast.error(result.message || "Failed to delete teacher");
        options?.onError?.(result.message || "Failed to delete teacher");
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
 * Hook for managing teacher list with filtering and search
 */
export function useTeacherList(teachers: Teacher[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  const filteredTeachers = teachers.filter((teacher) => {
    // Filter by department
    if (departmentFilter !== "all" && teacher.departmentId !== departmentFilter) {
      return false;
    }

    // Filter by search query
    if (!searchQuery) return true;

    const query = searchQuery.toLowerCase();
    const fullName = `${teacher.firstName} ${teacher.lastName}`.toLowerCase();
    return (
      fullName.includes(query) ||
      teacher.email?.toLowerCase().includes(query) ||
      teacher.phone?.includes(query)
    );
  });

  return {
    searchQuery,
    setSearchQuery,
    departmentFilter,
    setDepartmentFilter,
    selectedTeacher,
    setSelectedTeacher,
    filteredTeachers,
  };
}
export default useTeacher;
