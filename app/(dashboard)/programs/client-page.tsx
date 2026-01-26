"use client";

import { useState } from "react";
import { GraduationCap, Plus } from "lucide-react";
import { Program, ProgramInput, Institution } from "@/lib/types";
import { PageHeader, DeleteDialog, EmptyState } from "@/components/shared";
import { ProgramFormDialog, ProgramsTable } from "@/components/programs";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  createProgram,
  updateProgram,
  deleteProgram,
} from "@/lib/actions/programs";

interface ProgramsClientPageProps {
  programs: (Program & { institutionName: string })[];
  institutions: Institution[];
}

export default function ProgramsClientPage({
  programs,
  institutions,
}: ProgramsClientPageProps) {
  const [selectedInstitutionId, setSelectedInstitutionId] =
    useState<string>("all");

  // Dialog states
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(
    null
  );

  // Filter programs by institution
  const filteredPrograms =
    selectedInstitutionId === "all"
      ? programs
      : programs.filter((p) => p.institutionId === selectedInstitutionId);

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
        title="Programs"
        description="Manage all academic programs across institutions"
        icon={GraduationCap}
        action={{
          label: "Add Program",
          onClick: handleCreate,
        }}
      />

      {/* Filter */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium">Filter by Institution:</label>
        <Select
          value={selectedInstitutionId}
          onValueChange={setSelectedInstitutionId}
        >
          <SelectTrigger className="w-64">
            <SelectValue placeholder="All Institutions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Institutions</SelectItem>
            {institutions.map((inst) => (
              <SelectItem key={inst.id} value={inst.id}>
                {inst.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filteredPrograms.length === 0 ? (
        <EmptyState
          title="No programs found"
          description={
            selectedInstitutionId === "all"
              ? "Get started by creating your first program."
              : "No programs found for this institution."
          }
          action={
            <Button onClick={handleCreate}>
              <Plus className="mr-2 h-4 w-4" />
              Add Program
            </Button>
          }
        />
      ) : (
        <ProgramsTable
          programs={filteredPrograms}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/* We need to pick an institution when creating */}
      {formDialogOpen && (
        <ProgramFormDialog
          open={formDialogOpen}
          onOpenChange={setFormDialogOpen}
          program={selectedProgram}
          institutionId={
            selectedProgram?.institutionId ||
            (selectedInstitutionId !== "all"
              ? selectedInstitutionId
              : institutions[0]?.id || "")
          }
          onSubmit={handleFormSubmit}
        />
      )}

      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Program"
        description={`Are you sure you want to delete "${
          selectedProgram?.name
        }"? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
