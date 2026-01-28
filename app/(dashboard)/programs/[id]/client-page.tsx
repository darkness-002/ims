"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, GraduationCap, Pencil, BookOpen, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Program, ProgramInput, Institution, Subject } from "@/lib/types";
import { ProgramFormDialog } from "@/components/programs";
import { ProgramCurriculum } from "@/components/programs/program-curriculum";
import { updateProgram } from "@/app/actions/programs";

interface ProgramSubjectWithSubject {
  id: string;
  programId: string;
  subjectId: string;
  termNumber: number;
  isElective: boolean;
  subject: Subject;
}

interface ProgramDetailClientPageProps {
  program: Program;
  institution: Institution | null;
  curriculum: ProgramSubjectWithSubject[];
  allSubjects: Subject[];
}

export default function ProgramDetailClientPage({
  program,
  institution,
  curriculum,
  allSubjects,
}: ProgramDetailClientPageProps) {
  const [formDialogOpen, setFormDialogOpen] = useState(false);

  if (!program) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-muted-foreground">Program not found</p>
      </div>
    );
  }

  const handleEdit = () => {
    setFormDialogOpen(true);
  };

  const handleFormSubmit = async (data: ProgramInput) => {
    await updateProgram(program.id, data);
  };

  return (
    <div className="space-y-6">
      {/* Header with back button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div
              className={`rounded-lg p-2 ${
                program.type === "SEMESTER_BASED"
                  ? "bg-purple-100"
                  : "bg-blue-100"
              }`}
            >
              {program.type === "SEMESTER_BASED" ? (
                <GraduationCap
                  className={`h-6 w-6 ${
                    program.type === "SEMESTER_BASED"
                      ? "text-purple-600"
                      : "text-blue-600"
                  }`}
                />
              ) : (
                <BookOpen className="h-6 w-6 text-blue-600" />
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{program.name}</h1>
              <p className="text-muted-foreground">
                {program.code ? `${program.code} • ` : ""}
                {program.type === "SEMESTER_BASED"
                  ? "Semester Based"
                  : "Annual Based"}
              </p>
            </div>
          </div>
        </div>
        <Button onClick={handleEdit}>
          <Pencil className="mr-2 h-4 w-4" />
          Edit Program
        </Button>
      </div>

      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details" className="gap-2">
            <BookOpen className="h-4 w-4" />
            Details
          </TabsTrigger>
          <TabsTrigger value="curriculum" className="gap-2">
            <Layers className="h-4 w-4" />
            Curriculum
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6">
          {/* Program Details Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Program Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Program Name
                  </label>
                  <p className="mt-1 font-medium">{program.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Program Code
                  </label>
                  <p className="mt-1">
                    {program.code ? (
                      <span className="rounded bg-muted px-2 py-1 text-sm font-medium">
                        {program.code}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">Not specified</span>
                    )}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Program Type
                  </label>
                  <p className="mt-1">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        program.type === "SEMESTER_BASED"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {program.type === "SEMESTER_BASED" ? "Semester Based" : "Annual Based"}
                    </span>
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Duration
                  </label>
                  <p className="mt-1">
                    {program.duration} {program.type === "SEMESTER_BASED" ? "Semesters" : "Years"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Institution
                  </label>
                  <p className="mt-1">
                    {institution ? (
                      <Link
                        href={`/institutions/${institution.id}`}
                        className="text-primary hover:underline"
                      >
                        {institution.name}
                      </Link>
                    ) : (
                      <span className="text-muted-foreground">Unknown</span>
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Note about Programs */}
          <Card className="border-dashed">
            <CardContent className="pt-6">
              <p className="text-sm text-.muted-foreground text-center">
                Programs are standalone entities. They don&apos;t contain departments or
                other nested data. Use the{" "}
                <Link href={`/institutions/${institution?.id}`} className="text-primary hover:underline">
                  Institution page
                </Link>{" "}
                to manage related departments and shifts.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="curriculum">
          <ProgramCurriculum 
            program={program} 
            curriculum={curriculum} 
            allSubjects={allSubjects} 
          />
        </TabsContent>
      </Tabs>

      {/* Edit Dialog */}
      <ProgramFormDialog
        open={formDialogOpen}
        onOpenChange={setFormDialogOpen}
        program={program}
        departmentId={program.departmentId}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}
