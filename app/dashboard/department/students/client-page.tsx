"use client";

import { useState } from "react";
import { UserPlus } from "lucide-react";
import { Student, StudentInput, Batch } from "@/lib/types";
import { PageHeader, DeleteDialog } from "@/components/shared";
import { StudentFormDialog } from "@/components/students/student-form-dialog";
import { StudentsTable } from "@/components/students/students-table";
import { useStudent } from "@/lib/hooks/use-student";

interface DepartmentStudentsClientPageProps {
  students: Student[];
  batches: Batch[];
  departmentName: string;
  institutionId: string;
}

export default function DepartmentStudentsClientPage({
  students,
  batches,
  departmentName,
  institutionId,
}: DepartmentStudentsClientPageProps) {
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const { create, update, remove } = useStudent();

  const handleCreate = () => {
    setSelectedStudent(null);
    setFormDialogOpen(true);
  };

  const handleEdit = (student: Student) => {
    setSelectedStudent(student);
    setFormDialogOpen(true);
  };

  const handleDelete = (student: Student) => {
    setSelectedStudent(student);
    setDeleteDialogOpen(true);
  };

  const handleFormSubmit = async (data: StudentInput) => {
    if (selectedStudent) {
      await update(selectedStudent.id, data);
    } else {
      await create(data);
    }
  };

  const handleConfirmDelete = async () => {
    if (selectedStudent) {
      await remove(selectedStudent.id);
      setDeleteDialogOpen(false);
      setSelectedStudent(null);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Department Students"
        description={`Manage student enrollment for ${departmentName}.`}
        icon={UserPlus}
        action={{
          label: "Enroll Student",
          onClick: handleCreate,
        }}
      />

      <StudentsTable
        students={students}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <StudentFormDialog
        open={formDialogOpen}
        onOpenChange={setFormDialogOpen}
        student={selectedStudent}
        batches={batches}
        institutionId={institutionId}
        onSubmit={handleFormSubmit}
      />

      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Student"
        description={`Are you sure you want to delete "${selectedStudent?.firstName} ${selectedStudent?.lastName}"?`}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
