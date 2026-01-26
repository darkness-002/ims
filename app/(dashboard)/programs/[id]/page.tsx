"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, GraduationCap, Building2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProgramById, getInstitutionById } from "@/lib/mock-data";
import { Program, ProgramInput, Institution } from "@/lib/types";
import { ProgramFormDialog } from "@/components/programs";

export default function ProgramDetailPage() {
  const params = useParams();
  const router = useRouter();
  const programId = params.id as string;

  // Load data using useMemo
  const initialData = useMemo(() => {
    const progData = getProgramById(programId);
    const instData = progData ? getInstitutionById(progData.institutionId) : null;
    return {
      program: progData || null,
      institution: instData || null,
    };
  }, [programId]);

  // Data state
  const [program, setProgram] = useState<Program | null>(initialData.program);
  const [institution] = useState<Institution | null>(initialData.institution);
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

  const handleFormSubmit = (data: ProgramInput) => {
    setProgram((prev) =>
      prev ? { ...prev, ...data, updatedAt: new Date() } : null
    );
  };

  return (
    <div className="space-y-6">
      {/* Header with back button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div
              className={`rounded-lg p-2 ${
                program.type === "GRADUATE"
                  ? "bg-purple-100"
                  : "bg-blue-100"
              }`}
            >
              <GraduationCap
                className={`h-6 w-6 ${
                  program.type === "GRADUATE"
                    ? "text-purple-600"
                    : "text-blue-600"
                }`}
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{program.name}</h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    program.type === "GRADUATE"
                      ? "bg-purple-100 text-purple-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {program.type === "GRADUATE" ? "Graduate" : "Undergraduate"}
                </span>
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
        <Button onClick={handleEdit}>
          <Pencil className="mr-2 h-4 w-4" />
          Edit Program
        </Button>
      </div>

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
                    program.type === "GRADUATE"
                      ? "bg-purple-100 text-purple-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {program.type === "GRADUATE" ? "Graduate" : "Undergraduate"}
                </span>
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
          <p className="text-sm text-muted-foreground text-center">
            Programs are standalone entities. They don&apos;t contain departments or
            other nested data. Use the{" "}
            <Link href={`/institutions/${program.institutionId}`} className="text-primary hover:underline">
              Institution page
            </Link>{" "}
            to manage related departments and shifts.
          </p>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <ProgramFormDialog
        open={formDialogOpen}
        onOpenChange={setFormDialogOpen}
        program={program}
        institutionId={program.institutionId}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}
