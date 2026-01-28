"use client";

import { useState } from "react";
import { Users } from "lucide-react";
import { Batch, BatchInput, Program } from "@/lib/types";
import { PageHeader, DeleteDialog } from "@/components/shared";
import { BatchFormDialog } from "@/components/batches/batch-form-dialog";
import { BatchesTable } from "@/components/batches/batches-table";
import { createBatch, updateBatch, deleteBatch } from "@/app/actions/batches";

interface DepartmentBatchesClientPageProps {
  batches: Batch[];
  programs: Program[];
  departmentName: string;
}

export default function DepartmentBatchesClientPage({
  batches,
  programs,
  departmentName,
}: DepartmentBatchesClientPageProps) {
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);

  const handleCreate = () => {
    setSelectedBatch(null);
    setFormDialogOpen(true);
  };

  const handleEdit = (batch: Batch) => {
    setSelectedBatch(batch);
    setFormDialogOpen(true);
  };

  const handleDelete = (batch: Batch) => {
    setSelectedBatch(batch);
    setDeleteDialogOpen(true);
  };

  const handleFormSubmit = async (data: BatchInput) => {
    if (selectedBatch) {
      await updateBatch(selectedBatch.id, data);
    } else {
      await createBatch(data);
    }
  };

  const handleConfirmDelete = async () => {
    if (selectedBatch) {
      await deleteBatch(selectedBatch.id);
      setDeleteDialogOpen(false);
      setSelectedBatch(null);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Department Batches"
        description={`Manage student batches/cohorts for ${departmentName}.`}
        icon={Users}
        action={{
          label: "Create Batch",
          onClick: handleCreate,
        }}
      />

      <BatchesTable
        batches={batches}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <BatchFormDialog
        open={formDialogOpen}
        onOpenChange={setFormDialogOpen}
        batch={selectedBatch}
        programs={programs}
        onSubmit={handleFormSubmit}
      />

      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Batch"
        description={`Are you sure you want to delete "${selectedBatch?.name}"?`}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
