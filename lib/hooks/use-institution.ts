"use client";

import { useState, useTransition } from "react";
import { Institution, InstitutionInput } from "@/lib/types";
import {
  createInstitution,
  updateInstitution,
  deleteInstitution,
} from "@/app/actions/institutions";
import { toast } from "sonner"; // or your toast library

interface UseInstitutionOptions {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function useInstitution(options?: UseInstitutionOptions) {
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);

  const create = async (data: InstitutionInput) => {
    setIsLoading(true);
    try {
      const result = await createInstitution(data);
      if (result.success) {
        toast.success("Institution created successfully");
        options?.onSuccess?.();
      } else {
        toast.error(result.message || "Failed to create institution");
        options?.onError?.(result.message || "Failed to create institution");
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

  const update = async (id: string, data: InstitutionInput) => {
    setIsLoading(true);
    try {
      const result = await updateInstitution(id, data);
      if (result.success) {
        toast.success("Institution updated successfully");
        options?.onSuccess?.();
      } else {
        toast.error(result.message || "Failed to update institution");
        options?.onError?.(result.message || "Failed to update institution");
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
      const result = await deleteInstitution(id);
      if (result.success) {
        toast.success("Institution deleted successfully");
        options?.onSuccess?.();
      } else {
        toast.error(result.message || "Failed to delete institution");
        options?.onError?.(result.message || "Failed to delete institution");
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
 * Hook for managing institution list with filtering and search
 */
export function useInstitutionList(institutions: Institution[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInstitution, setSelectedInstitution] = useState<Institution | null>(null);

  const filteredInstitutions = institutions.filter((institution) => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      institution.name.toLowerCase().includes(query) ||
      institution.code.toLowerCase().includes(query) ||
      institution.email?.toLowerCase().includes(query) ||
      institution.phone?.includes(query)
    );
  });

  const getInstitutionStats = (institution: Institution) => {
    return {
      departmentCount: institution.departments?.length || 0,
      shiftCount: institution.shifts?.length || 0,
      programCount: institution.departments?.reduce(
        (sum, dept) => sum + (dept.programs?.length || 0),
        0
      ) || 0,
    };
  };

  return {
    searchQuery,
    setSearchQuery,
    selectedInstitution,
    setSelectedInstitution,
    filteredInstitutions,
    getInstitutionStats,
  };
}
export default useInstitution;