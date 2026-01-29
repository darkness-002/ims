"use client";

import { useState, useTransition } from "react";
import { Shift, ShiftInput } from "@/lib/types";
import {
  createShift,
  updateShift,
  deleteShift,
} from "@/app/actions/shifts";
import { toast } from "sonner";

interface UseShiftOptions {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function useShift(options?: UseShiftOptions) {
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);

  const create = async (data: ShiftInput) => {
    setIsLoading(true);
    try {
      const result = await createShift(data);
      if (result.success) {
        toast.success("Shift created successfully");
        options?.onSuccess?.();
      } else {
        toast.error(result.message || "Failed to create shift");
        options?.onError?.(result.message || "Failed to create shift");
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

  const update = async (id: string, data: ShiftInput) => {
    setIsLoading(true);
    try {
      const result = await updateShift(id, data);
      if (result.success) {
        toast.success("Shift updated successfully");
        options?.onSuccess?.();
      } else {
        toast.error(result.message || "Failed to update shift");
        options?.onError?.(result.message || "Failed to update shift");
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
      const result = await deleteShift(id);
      if (result.success) {
        toast.success("Shift deleted successfully");
        options?.onSuccess?.();
      } else {
        toast.error(result.message || "Failed to delete shift");
        options?.onError?.(result.message || "Failed to delete shift");
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
 * Hook for managing shift list with filtering and search
 */
export function useShiftList(shifts: Shift[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedShift, setSelectedShift] = useState<Shift | null>(null);

  const filteredShifts = shifts.filter((shift) => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return shift.name.toLowerCase().includes(query);
  });

  return {
    searchQuery,
    setSearchQuery,
    selectedShift,
    setSelectedShift,
    filteredShifts,
  };
}
export default useShift;
