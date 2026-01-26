"use client";

import { useState } from "react";
import { Clock, Plus } from "lucide-react";
import { getInstitutions } from "@/lib/mock-data";
import { generateId } from "@/lib/utils";
import { Shift, ShiftInput } from "@/lib/types";
import { PageHeader, DeleteDialog, EmptyState } from "@/components/shared";
import { ShiftFormDialog, ShiftsTable } from "@/components/shifts";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ShiftsPage() {
  const institutions = getInstitutions();

  // Flatten all shifts from all institutions
  const allShifts = institutions.flatMap((inst) =>
    (inst.shifts || []).map((shift) => ({
      ...shift,
      institutionName: inst.name,
    }))
  );

  const [shifts, setShifts] = useState<(Shift & { institutionName: string })[]>(allShifts);
  const [selectedInstitutionId, setSelectedInstitutionId] = useState<string>("all");

  // Dialog states
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedShift, setSelectedShift] = useState<Shift | null>(null);

  // Filter shifts by institution
  const filteredShifts = selectedInstitutionId === "all"
    ? shifts
    : shifts.filter((s) => s.institutionId === selectedInstitutionId);

  const handleCreate = () => {
    setSelectedShift(null);
    setFormDialogOpen(true);
  };

  const handleEdit = (shift: Shift) => {
    setSelectedShift(shift);
    setFormDialogOpen(true);
  };

  const handleDelete = (shift: Shift) => {
    setSelectedShift(shift);
    setDeleteDialogOpen(true);
  };

  const handleFormSubmit = (data: ShiftInput) => {
    const inst = institutions.find((i) => i.id === data.institutionId);
    if (selectedShift) {
      setShifts((prev) =>
        prev.map((shift) =>
          shift.id === selectedShift.id
            ? { ...shift, ...data, institutionName: inst?.name || "", updatedAt: new Date() }
            : shift
        )
      );
    } else {
      const newShift: Shift & { institutionName: string } = {
        id: generateId("shift"),
        ...data,
        institutionName: inst?.name || "",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setShifts((prev) => [...prev, newShift]);
    }
  };

  const handleConfirmDelete = () => {
    if (selectedShift) {
      setShifts((prev) => prev.filter((shift) => shift.id !== selectedShift.id));
      setDeleteDialogOpen(false);
      setSelectedShift(null);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Shifts"
        description="Manage all shifts across institutions"
        icon={Clock}
        action={{
          label: "Add Shift",
          onClick: handleCreate,
        }}
      />

      {/* Filter */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium">Filter by Institution:</label>
        <Select value={selectedInstitutionId} onValueChange={setSelectedInstitutionId}>
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

      {filteredShifts.length === 0 ? (
        <EmptyState
          title="No shifts found"
          description={
            selectedInstitutionId === "all"
              ? "Get started by creating your first shift."
              : "No shifts found for this institution."
          }
          action={
            <Button onClick={handleCreate}>
              <Plus className="mr-2 h-4 w-4" />
              Add Shift
            </Button>
          }
        />
      ) : (
        <ShiftsTable
          shifts={filteredShifts}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {formDialogOpen && (
        <ShiftFormDialog
          open={formDialogOpen}
          onOpenChange={setFormDialogOpen}
          shift={selectedShift}
          institutionId={selectedShift?.institutionId || (selectedInstitutionId !== "all" ? selectedInstitutionId : institutions[0]?.id || "")}
          onSubmit={handleFormSubmit}
        />
      )}

      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Shift"
        description={`Are you sure you want to delete "${selectedShift?.name}"? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
