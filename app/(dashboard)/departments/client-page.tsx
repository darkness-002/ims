"use client";

import { useState } from "react";
import { Users, Plus } from "lucide-react";
import { Department, DepartmentInput, Institution } from "@/lib/types";
import { PageHeader, DeleteDialog, EmptyState } from "@/components/shared";
import {
  DepartmentFormDialog,
  DepartmentsTable,
} from "@/components/departments";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDepartment } from "@/lib/hooks/use-department";

interface DepartmentsClientPageProps {
  departments: (Department & { institutionName: string })[];
  institutions: Institution[];
}

export default function DepartmentsClientPage({
  departments,
  institutions,
}: DepartmentsClientPageProps) {
  const [selectedInstitutionId, setSelectedInstitutionId] =
    useState<string>("all");

  const { create, update, remove } = useDepartment();

  // Dialog states
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] =
    useState<Department | null>(null);

  // Filter departments by institution
  const filteredDepartments =
    selectedInstitutionId === "all"
      ? departments
      : departments.filter((d) => d.institutionId === selectedInstitutionId);

  const handleCreate = () => {
    setSelectedDepartment(null);
    setFormDialogOpen(true);
  };

  const handleEdit = (department: Department) => {
    setSelectedDepartment(department);
    setFormDialogOpen(true);
  };

  const handleDelete = (department: Department) => {
    setSelectedDepartment(department);
    setDeleteDialogOpen(true);
  };

  const handleFormSubmit = async (data: DepartmentInput) => {
    if (selectedDepartment) {
      await update(selectedDepartment.id, data);
    } else {
      await create(data);
    }
    setFormDialogOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (selectedDepartment) {
      await remove(selectedDepartment.id);
      setDeleteDialogOpen(false);
      setSelectedDepartment(null);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Departments"
        description="Manage all departments across institutions"
        icon={Users}
        action={{
          label: "Add Department",
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

      {filteredDepartments.length === 0 ? (
        <EmptyState
          title="No departments found"
          description={
            selectedInstitutionId === "all"
              ? "Get started by creating your first department."
              : "No departments found for this institution."
          }
          action={
            <Button onClick={handleCreate}>
              <Plus className="mr-2 h-4 w-4" />
              Add Department
            </Button>
          }
        />
      ) : (
        <DepartmentsTable
          departments={filteredDepartments}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {formDialogOpen && (
        <DepartmentFormDialog
          open={formDialogOpen}
          onOpenChange={setFormDialogOpen}
          department={selectedDepartment}
          institutionId={
            selectedDepartment?.institutionId ||
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
        title="Delete Department"
        description={`Are you sure you want to delete "${
          selectedDepartment?.name
        }"? This will also delete all teachers in this department. This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
