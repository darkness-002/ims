"use client";

import { useState } from "react";
import { UserPlus } from "lucide-react";
import { Teacher, TeacherInput } from "@/lib/types";
import { PageHeader, DeleteDialog } from "@/components/shared";
import { TeacherFormDialog, TeachersTable } from "@/components/teachers";
import { Button } from "@/components/ui/button";
import { createTeacher, updateTeacher, deleteTeacher } from "@/lib/actions/teachers";

interface DepartmentTeachersClientPageProps {
  teachers: Teacher[];
  departmentId: string;
  departmentName: string;
  institutionId: string;
}

export default function DepartmentTeachersClientPage({
  teachers,
  departmentId,
  departmentName,
  institutionId,
}: DepartmentTeachersClientPageProps) {
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  const handleCreate = () => {
    setSelectedTeacher(null);
    setFormDialogOpen(true);
  };

  const handleEdit = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setFormDialogOpen(true);
  };

  const handleDelete = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setDeleteDialogOpen(true);
  };

  const handleFormSubmit = async (data: TeacherInput) => {
    if (selectedTeacher) {
      await updateTeacher(selectedTeacher.id, data);
    } else {
      await createTeacher(data);
    }
  };

  const handleConfirmDelete = async () => {
    if (selectedTeacher) {
      await deleteTeacher(selectedTeacher.id);
      setDeleteDialogOpen(false);
      setSelectedTeacher(null);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Department Teachers"
        description={`Manage faculty members for ${departmentName}.`}
        icon={UserPlus}
        action={{
          label: "Add Teacher",
          onClick: handleCreate,
        }}
      />

      <TeachersTable
        teachers={teachers}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <TeacherFormDialog
        open={formDialogOpen}
        onOpenChange={setFormDialogOpen}
        teacher={selectedTeacher}
        departmentId={departmentId}
        institutionId={institutionId}
        onSubmit={handleFormSubmit}
      />

      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Teacher"
        description={`Are you sure you want to delete "${selectedTeacher?.firstName} ${selectedTeacher?.lastName}"?`}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
