"use client";

import { useState, useTransition, useMemo } from "react";
import { Batch, BatchInput } from "@/lib/types";
import {
  createBatch,
  updateBatch,
  deleteBatch,
} from "@/app/actions/batches";
import { toast } from "sonner";

interface UseBatchOptions {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function useBatch(options?: UseBatchOptions) {
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);

  const create = async (data: BatchInput) => {
    setIsLoading(true);
    try {
      const result = await createBatch(data);
      if (result.success) {
        toast.success("Batch created successfully");
        options?.onSuccess?.();
      } else {
        toast.error(result.message || "Failed to create batch");
        options?.onError?.(result.message || "Failed to create batch");
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

  const update = async (id: string, data: BatchInput) => {
    setIsLoading(true);
    try {
      const result = await updateBatch(id, data);
      if (result.success) {
        toast.success("Batch updated successfully");
        options?.onSuccess?.();
      } else {
        toast.error(result.message || "Failed to update batch");
        options?.onError?.(result.message || "Failed to update batch");
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
      const result = await deleteBatch(id);
      if (result.success) {
        toast.success("Batch deleted successfully");
        options?.onSuccess?.();
      } else {
        toast.error(result.message || "Failed to delete batch");
        options?.onError?.(result.message || "Failed to delete batch");
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
 * Hook for managing batch list with filtering and sorting
 */
export function useBatchList(batches: Batch[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [programFilter, setProgramFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);

  const filteredBatches = useMemo(() => {
    return batches.filter((batch) => {
      // Filter by program
      if (programFilter !== "all" && batch.programId !== programFilter) {
        return false;
      }

      // Filter by status
      if (statusFilter === "active" && !batch.isActive) return false;
      if (statusFilter === "inactive" && batch.isActive) return false;

      // Filter by search query
      if (!searchQuery) return true;

      const query = searchQuery.toLowerCase();
      return (
        batch.name.toLowerCase().includes(query) ||
        batch.program?.name.toLowerCase().includes(query)
      );
    });
  }, [batches, searchQuery, programFilter, statusFilter]);

  const activeBatches = useMemo(() => {
    return batches.filter((batch) => batch.isActive);
  }, [batches]);

  const inactiveBatches = useMemo(() => {
    return batches.filter((batch) => !batch.isActive);
  }, [batches]);

  const getBatchStatus = (batch: Batch) => {
    const now = new Date();
    const startDate = new Date(batch.startDate);
    const endDate = batch.endDate ? new Date(batch.endDate) : null;

    if (!batch.isActive) return "inactive";
    if (now < startDate) return "upcoming";
    if (endDate && now > endDate) return "completed";
    return "ongoing";
  };

  const sortBatches = (
    batches: Batch[],
    sortBy: "name" | "startDate" | "endDate" = "startDate",
    order: "asc" | "desc" = "desc"
  ) => {
    return [...batches].sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "startDate":
          comparison = new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
          break;
        case "endDate":
          const aEnd = a.endDate ? new Date(a.endDate).getTime() : 0;
          const bEnd = b.endDate ? new Date(b.endDate).getTime() : 0;
          comparison = aEnd - bEnd;
          break;
      }

      return order === "asc" ? comparison : -comparison;
    });
  };

  const groupByProgram = () => {
    return filteredBatches.reduce((acc, batch) => {
      const programId = batch.programId;
      if (!acc[programId]) {
        acc[programId] = [];
      }
      acc[programId].push(batch);
      return acc;
    }, {} as Record<string, Batch[]>);
  };

  return {
    searchQuery,
    setSearchQuery,
    programFilter,
    setProgramFilter,
    statusFilter,
    setStatusFilter,
    selectedBatch,
    setSelectedBatch,
    filteredBatches,
    activeBatches,
    inactiveBatches,
    getBatchStatus,
    sortBatches,
    groupByProgram,
  };
}
export default useBatch;