"use client";

import { Student } from "@/lib/types";
import { DataTable } from "@/components/ui/data-table";
import { getStudentColumns } from "./columns";

interface StudentsTableProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (student: Student) => void;
}

export function StudentsTable({
  students,
  onEdit,
  onDelete,
}: StudentsTableProps) {
  const columns = getStudentColumns(onEdit, onDelete);

  return (
    <DataTable columns={columns} data={students} />
  );
}
