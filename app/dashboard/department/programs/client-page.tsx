"use client";

import { useState } from "react";
import { GraduationCap, Plus } from "lucide-react";
import { Program, ProgramInput } from "@/lib/types";
import { PageHeader, DeleteDialog } from "@/components/shared";
import { ProgramFormDialog, ProgramsTable } from "@/components/programs";
import { Button } from "@/components/ui/button";
import { createProgram, updateProgram, deleteProgram } from "@/lib/actions/programs";

interface DepartmentProgramsClientPageProps {
  programs: Program[];
  departmentId: string;
  departmentName: string;
}

export default function DepartmentProgramsClientPage({
  programs,
  departmentId,
  departmentName,
}: DepartmentProgramsClientPageProps) {
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  const handleCreate = () => {
    setSelectedProgram(null);
    setFormDialogOpen(true);
  };

  const handleEdit = (program: Program) => {
    setSelectedProgram(program);
    setFormDialogOpen(true);
  };

  const handleDelete = (program: Program) => {
    setSelectedProgram(program);
    setDeleteDialogOpen(true);
  };

  const handleFormSubmit = async (data: ProgramInput) => {
    if (selectedProgram) {
      await updateProgram(selectedProgram.id, data);
    } else {
      await createProgram(data);
    }
  };

  const handleConfirmDelete = async () => {
    if (selectedProgram) {
      await deleteProgram(selectedProgram.id);
      setDeleteDialogOpen(false);
      setSelectedProgram(null);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Department Programs"
        description={`Manage academic programs for ${departmentName}.`}
        icon={GraduationCap}
        action={{
          label: "Add Program",
          onClick: handleCreate,
        }}
      />

      <ProgramsTable
        programs={programs}
        onEdit={handleEdit}
        onDelete={handleDelete}
        showViewLink={true}
      />

      <ProgramFormDialog
        open={formDialogOpen}
        onOpenChange={setFormDialogOpen}
        program={selectedProgram}
        departmentId={departmentId}
        onSubmit={handleFormSubmit}
      />

      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Program"
        description={`Are you sure you want to delete "${selectedProgram?.name}"?`}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
