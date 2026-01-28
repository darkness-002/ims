"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Users, Plus, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DeleteDialog } from "@/components/shared";
import { Department, Teacher, TeacherInput, Institution } from "@/lib/types";
import { TeacherFormDialog, TeachersTable } from "@/components/teachers";
import {
  createTeacher,
  updateTeacher,
  deleteTeacher,
} from "@/app/actions/teachers";

interface DepartmentDetailClientPageProps {
  department: Department;
  institution: Institution | null;
  teachers: Teacher[];
}

export default function DepartmentDetailClientPage({
  department,
  institution,
  teachers,
}: DepartmentDetailClientPageProps) {
  // Dialog states
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  if (!department) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-muted-foreground">Department not found</p>
      </div>
    );
  }

  // Handlers
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
      {/* Header with back button */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-purple-100 p-2">
            <Users className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{department.name}</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              {department.code && (
                <span className="rounded bg-muted px-2 py-0.5 text-xs font-medium">
                  {department.code}
                </span>
              )}
              {institution && (
                <Link
                  href={`/institutions/${institution.id}`}
                  className="flex items-center gap-1 text-sm hover:underline"
                >
                  <Building2 className="h-3 w-3" />
                  {institution.name}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Card */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Teachers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{teachers.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Teachers Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Teachers
          </CardTitle>
          <Button onClick={handleCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Add Teacher
          </Button>
        </CardHeader>
        <CardContent>
          <TeachersTable
            teachers={teachers}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>

      {/* Dialogs */}
      <TeacherFormDialog
        open={formDialogOpen}
        onOpenChange={setFormDialogOpen}
        teacher={selectedTeacher}
        departmentId={department.id}
        institutionId={department.institutionId}
        onSubmit={handleFormSubmit}
      />

      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Teacher"
        description={`Are you sure you want to delete ${selectedTeacher?.firstName} ${selectedTeacher?.lastName}? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
