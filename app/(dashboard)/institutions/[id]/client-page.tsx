"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  ArrowLeft,
  Clock,
  Users,
  Plus,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DeleteDialog } from "@/components/shared";
import {
  Institution,
  Shift,
  Department,
  ShiftInput,
  DepartmentInput,
} from "@/lib/types";

// Component imports
import { ShiftFormDialog, ShiftsTable } from "@/components/shifts";
import { DepartmentFormDialog, DepartmentsTable } from "@/components/departments";
import { useShift } from "@/lib/hooks/use-shift";
import { useDepartment } from "@/lib/hooks/use-department";

interface InstitutionDetailClientPageProps {
  institution: Institution;
}

export default function InstitutionDetailClientPage({ institution }: InstitutionDetailClientPageProps) {
  const router = useRouter();
  
  const { 
    create: createShift, 
    update: updateShift, 
    remove: removeShift 
  } = useShift();
  
  const { 
    create: createDepartment, 
    update: updateDepartment, 
    remove: removeDepartment 
  } = useDepartment();

  // Dialog states
  const [shiftDialogOpen, setShiftDialogOpen] = useState(false);
  const [departmentDialogOpen, setDepartmentDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Selected items for edit/delete
  const [selectedShift, setSelectedShift] = useState<Shift | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [deleteType, setDeleteType] = useState<"shift" | "department" | null>(null);

  const institutionId = institution.id;
  const shifts = institution.shifts || [];
  const departments = institution.departments || [];

  // Shift handlers
  const handleCreateShift = () => {
    setSelectedShift(null);
    setShiftDialogOpen(true);
  };

  const handleEditShift = (shift: Shift) => {
    setSelectedShift(shift);
    setShiftDialogOpen(true);
  };

  const handleDeleteShift = (shift: Shift) => {
    setSelectedShift(shift);
    setDeleteType("shift");
    setDeleteDialogOpen(true);
  };

  const handleShiftSubmit = async (data: ShiftInput) => {
    if (selectedShift) {
      await updateShift(selectedShift.id, data);
    } else {
      await createShift(data);
    }
    setShiftDialogOpen(false);
  };

  // Department handlers
  const handleCreateDepartment = () => {
    setSelectedDepartment(null);
    setDepartmentDialogOpen(true);
  };

  const handleEditDepartment = (department: Department) => {
    setSelectedDepartment(department);
    setDepartmentDialogOpen(true);
  };

  const handleDeleteDepartment = (department: Department) => {
    setSelectedDepartment(department);
    setDeleteType("department");
    setDeleteDialogOpen(true);
  };

  const handleDepartmentSubmit = async (data: DepartmentInput) => {
    if (selectedDepartment) {
      await updateDepartment(selectedDepartment.id, data);
    } else {
      await createDepartment(data);
    }
    setDepartmentDialogOpen(false);
  };

  // Confirm delete
  const handleConfirmDelete = async () => {
    if (deleteType === "shift" && selectedShift) {
      await removeShift(selectedShift.id);
    } else if (deleteType === "department" && selectedDepartment) {
      await removeDepartment(selectedDepartment.id);
    }
    setDeleteDialogOpen(false);
    setSelectedShift(null);
    setSelectedDepartment(null);
    setDeleteType(null);
  };

  const getDeleteDialogProps = () => {
    if (deleteType === "shift" && selectedShift) {
      return {
        title: "Delete Shift",
        description: `Are you sure you want to delete the "${selectedShift.name}" shift?`,
      };
    }
    if (deleteType === "department" && selectedDepartment) {
      return {
        title: "Delete Department",
        description: `Are you sure you want to delete "${selectedDepartment.name}"? This will also delete all teachers in this department.`,
      };
    }
    return { title: "", description: "" };
  };

  return (
    <div className="space-y-6">
      {/* Header with back button */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-2">
            <Building2 className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{institution.name}</h1>
            <p className="text-muted-foreground">
              Code: {institution.code}
            </p>
          </div>
        </div>
      </div>

      {/* Institution Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Institution Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {institution.address && (
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{institution.address}</span>
              </div>
            )}
            {institution.email && (
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{institution.email}</span>
              </div>
            )}
            {institution.phone && (
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{institution.phone}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tabs for Shifts, Departments */}
      <Tabs defaultValue="shifts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="shifts" className="gap-2">
            <Clock className="h-4 w-4" />
            Shifts ({shifts.length})
          </TabsTrigger>
          <TabsTrigger value="departments" className="gap-2">
            <Users className="h-4 w-4" />
            Departments ({departments.length})
          </TabsTrigger>
        </TabsList>

        {/* Shifts Tab */}
        <TabsContent value="shifts" className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={handleCreateShift}>
              <Plus className="mr-2 h-4 w-4" />
              Add Shift
            </Button>
          </div>
          <ShiftsTable
            shifts={shifts}
            onEdit={handleEditShift}
            onDelete={handleDeleteShift}
          />
        </TabsContent>

        {/* Departments Tab */}
        <TabsContent value="departments" className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={handleCreateDepartment}>
              <Plus className="mr-2 h-4 w-4" />
              Add Department
            </Button>
          </div>
          <DepartmentsTable
            departments={departments}
            onEdit={handleEditDepartment}
            onDelete={handleDeleteDepartment}
          />
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      <ShiftFormDialog
        open={shiftDialogOpen}
        onOpenChange={setShiftDialogOpen}
        shift={selectedShift}
        institutionId={institutionId}
        onSubmit={handleShiftSubmit}
      />

      <DepartmentFormDialog
        open={departmentDialogOpen}
        onOpenChange={setDepartmentDialogOpen}
        department={selectedDepartment}
        institutionId={institutionId}
        onSubmit={handleDepartmentSubmit}
      />

      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        {...getDeleteDialogProps()}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
