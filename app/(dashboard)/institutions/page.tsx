"use client";

import { useState } from "react";
import { Building2 } from "lucide-react";
import { getInstitutions } from "@/lib/mock-data";
import { Institution, InstitutionInput } from "@/lib/types";
import { PageHeader, DeleteDialog, EmptyState } from "@/components/shared";
import {
  InstitutionFormDialog,
  InstitutionsTable,
} from "@/components/institutions";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function InstitutionsPage() {
  // State for mock data (in real app, this would be fetched)
  const [institutions, setInstitutions] = useState<Institution[]>(
    getInstitutions()
  );

  // Dialog states
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedInstitution, setSelectedInstitution] =
    useState<Institution | null>(null);

  // Handlers
  const handleCreate = () => {
    setSelectedInstitution(null);
    setFormDialogOpen(true);
  };

  const handleEdit = (institution: Institution) => {
    setSelectedInstitution(institution);
    setFormDialogOpen(true);
  };

  const handleDelete = (institution: Institution) => {
    setSelectedInstitution(institution);
    setDeleteDialogOpen(true);
  };

  const handleFormSubmit = (data: InstitutionInput) => {
    if (selectedInstitution) {
      // Update existing
      setInstitutions((prev) =>
        prev.map((inst) =>
          inst.id === selectedInstitution.id
            ? { ...inst, ...data, updatedAt: new Date() }
            : inst
        )
      );
    } else {
      // Create new
      const newInstitution: Institution = {
        id: `inst-${Date.now()}`,
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
        shifts: [],
        programs: [],
        departments: [],
      };
      setInstitutions((prev) => [...prev, newInstitution]);
    }
  };

  const handleConfirmDelete = () => {
    if (selectedInstitution) {
      setInstitutions((prev) =>
        prev.filter((inst) => inst.id !== selectedInstitution.id)
      );
      setDeleteDialogOpen(false);
      setSelectedInstitution(null);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Institutions"
        description="Manage all educational institutions"
        icon={Building2}
        action={{
          label: "Add Institution",
          onClick: handleCreate,
        }}
      />

      {institutions.length === 0 ? (
        <EmptyState
          title="No institutions yet"
          description="Get started by creating your first institution."
          action={
            <Button onClick={handleCreate}>
              <Plus className="mr-2 h-4 w-4" />
              Add Institution
            </Button>
          }
        />
      ) : (
        <InstitutionsTable
          institutions={institutions}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/* Form Dialog */}
      <InstitutionFormDialog
        open={formDialogOpen}
        onOpenChange={setFormDialogOpen}
        institution={selectedInstitution}
        onSubmit={handleFormSubmit}
      />

      {/* Delete Confirmation */}
      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Institution"
        description={`Are you sure you want to delete "${selectedInstitution?.name}"? This will also delete all associated shifts, programs, departments, and teachers. This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
