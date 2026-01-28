"use client";

import { useState, useTransition, useMemo } from "react";
import { Student, StudentInput } from "@/lib/types";
import {
  createStudent,
  updateStudent,
  deleteStudent,
} from "@/app/actions/students";
import { toast } from "sonner";

interface UseStudentOptions {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function useStudent(options?: UseStudentOptions) {
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);

  const create = async (data: StudentInput) => {
    setIsLoading(true);
    try {
      const result = await createStudent(data);
      if (result.success) {
        toast.success("Student created successfully");
        options?.onSuccess?.();
      } else {
        toast.error(result.message || "Failed to create student");
        options?.onError?.(result.message || "Failed to create student");
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

  const update = async (id: string, data: StudentInput) => {
    setIsLoading(true);
    try {
      const result = await updateStudent(id, data);
      if (result.success) {
        toast.success("Student updated successfully");
        options?.onSuccess?.();
      } else {
        toast.error(result.message || "Failed to update student");
        options?.onError?.(result.message || "Failed to update student");
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
      const result = await deleteStudent(id);
      if (result.success) {
        toast.success("Student deleted successfully");
        options?.onSuccess?.();
      } else {
        toast.error(result.message || "Failed to delete student");
        options?.onError?.(result.message || "Failed to delete student");
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
 * Hook for managing student list with filtering and sorting
 */
export function useStudentList(students: Student[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [batchFilter, setBatchFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      // Filter by batch
      if (batchFilter !== "all" && student.batchId !== batchFilter) {
        return false;
      }

      // Filter by status
      if (statusFilter !== "all" && student.status !== statusFilter) {
        return false;
      }

      // Filter by search query
      if (!searchQuery) return true;

      const query = searchQuery.toLowerCase();
      const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
      return (
        fullName.includes(query) ||
        student.rollNumber.toLowerCase().includes(query) ||
        (student.email && student.email.toLowerCase().includes(query))
      );
    });
  }, [students, searchQuery, batchFilter, statusFilter]);

  const activeStudents = useMemo(() => {
    return students.filter((student) => student.status === "ACTIVE");
  }, [students]);

  const sortStudents = (
    students: Student[],
    sortBy: "name" | "rollNumber" | "createdAt" = "rollNumber",
    order: "asc" | "desc" = "asc"
  ) => {
    return [...students].sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "name":
          comparison = `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
          break;
        case "rollNumber":
          comparison = a.rollNumber.localeCompare(b.rollNumber);
          break;
        case "createdAt":
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
      }

      return order === "asc" ? comparison : -comparison;
    });
  };

  return {
    searchQuery,
    setSearchQuery,
    batchFilter,
    setBatchFilter,
    statusFilter,
    setStatusFilter,
    selectedStudent,
    setSelectedStudent,
    filteredStudents,
    activeStudents,
    sortStudents,
  };
}
export default useStudent;
