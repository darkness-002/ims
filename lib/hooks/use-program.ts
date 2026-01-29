"use client";

import { useState, useTransition } from "react";
import { Program, ProgramInput } from "@/lib/types";
import {
  createProgram,
  updateProgram,
  deleteProgram,
} from "@/app/actions/programs";
import { toast } from "sonner";

interface UseProgramOptions {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function useProgram(options?: UseProgramOptions) {
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);

  const create = async (data: ProgramInput) => {
    setIsLoading(true);
    try {
      const result = await createProgram(data);
      if (result.success) {
        toast.success("Program created successfully");
        options?.onSuccess?.();
      } else {
        toast.error(result.message || "Failed to create program");
        options?.onError?.(result.message || "Failed to create program");
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

  const update = async (id: string, data: ProgramInput) => {
    setIsLoading(true);
    try {
      const result = await updateProgram(id, data);
      if (result.success) {
        toast.success("Program updated successfully");
        options?.onSuccess?.();
      } else {
        toast.error(result.message || "Failed to update program");
        options?.onError?.(result.message || "Failed to update program");
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
      const result = await deleteProgram(id);
      if (result.success) {
        toast.success("Program deleted successfully");
        options?.onSuccess?.();
      } else {
        toast.error(result.message || "Failed to delete program");
        options?.onError?.(result.message || "Failed to delete program");
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
 * Hook for managing program list with filtering and search
 */
export function useProgramList(programs: Program[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  const filteredPrograms = programs.filter((program) => {
    // Filter by department
    if (departmentFilter !== "all" && program.departmentId !== departmentFilter) {
      return false;
    }

    // Filter by type
    if (typeFilter !== "all" && program.type !== typeFilter) {
      return false;
    }

    // Filter by search query
    if (!searchQuery) return true;

    const query = searchQuery.toLowerCase();
    return (
      program.name.toLowerCase().includes(query) ||
      program.code?.toLowerCase().includes(query)
    );
  });

  return {
    searchQuery,
    setSearchQuery,
    departmentFilter,
    setDepartmentFilter,
    typeFilter,
    setTypeFilter,
    selectedProgram,
    setSelectedProgram,
    filteredPrograms,
  };
}
export default useProgram;
