"use client";

import { useState } from "react";
import { Plus, Trash2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Program, Subject } from "@/lib/types";
import { addSubjectToCurriculum, removeSubjectFromCurriculum } from "@/app/actions/curriculum";

// Define the shape of the curriculum data
interface ProgramSubjectWithSubject {
  id: string;
  programId: string;
  subjectId: string;
  termNumber: number;
  isElective: boolean;
  subject: Subject;
}

interface ProgramCurriculumProps {
  program: Program;
  curriculum: ProgramSubjectWithSubject[];
  allSubjects: Subject[];
}

export function ProgramCurriculum({
  program,
  curriculum,
  allSubjects,
}: ProgramCurriculumProps) {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState<number>(1);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("");
  const [isElective, setIsElective] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  // Group subjects by term
  const subjectsByTerm = curriculum.reduce((acc, item) => {
    const term = item.termNumber;
    if (!acc[term]) acc[term] = [];
    acc[term].push(item);
    return acc;
  }, {} as Record<number, ProgramSubjectWithSubject[]>);

  // Generate term numbers based on program duration
  const terms = Array.from({ length: program.duration }, (_, i) => i + 1);

  const handleAddSubject = async () => {
    if (!selectedSubjectId) return;
    setLoading(true);
    await addSubjectToCurriculum(program.id, selectedSubjectId, selectedTerm, isElective);
    setLoading(false);
    setAddDialogOpen(false);
    setSelectedSubjectId("");
    setIsElective(false);
  };

  const handleRemoveSubject = async (id: string) => {
    if (confirm("Are you sure you want to remove this subject?")) {
      await removeSubjectFromCurriculum(id, program.id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Curriculum Structure</h2>
        <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Subject
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Subject to Curriculum</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Term / Year</Label>
                <Select
                  value={selectedTerm.toString()}
                  onValueChange={(v) => setSelectedTerm(parseInt(v))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select term" />
                  </SelectTrigger>
                  <SelectContent>
                    {terms.map((term) => (
                      <SelectItem key={term} value={term.toString()}>
                        {program.type === "SEMESTER_BASED" ? `Semester ${term}` : `Year ${term}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Subject</Label>
                <Select
                  value={selectedSubjectId}
                  onValueChange={setSelectedSubjectId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {allSubjects.map((subject) => (
                      <SelectItem key={subject.id} value={subject.id}>
                        {subject.code} - {subject.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="elective"
                  checked={isElective}
                  onCheckedChange={(checked) => setIsElective(!!checked)}
                />
                <Label htmlFor="elective">Is Elective?</Label>
              </div>

              <Button onClick={handleAddSubject} className="w-full" disabled={loading}>
                {loading ? "Adding..." : "Add Subject"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {terms.map((term) => (
          <Card key={term} className="relative overflow-hidden">
             <div className="absolute top-0 left-0 w-1 h-full bg-primary/20" />
            <CardHeader className="pb-2 bg-muted/20">
              <CardTitle className="text-base font-medium flex justify-between">
                {program.type === "SEMESTER_BASED" ? `Semester ${term}` : `Year ${term}`}
                <Badge variant="outline" className="font-normal text-muted-foreground">
                   {(subjectsByTerm[term] || []).length} Subjects
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-3">
                {(subjectsByTerm[term] || []).length === 0 ? (
                  <p className="text-sm text-muted-foreground italic">No subjects assigned</p>
                ) : (
                  (subjectsByTerm[term] || []).map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between rounded-md border p-3 hover:bg-muted/50 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-blue-100 p-2">
                            <BookOpen className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium leading-none">
                            {item.subject.name}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                             <p className="text-xs text-muted-foreground">
                                {item.subject.code} • {item.subject.credits} Credits
                             </p>
                             {item.isElective && (
                                <Badge variant="secondary" className="text-[10px] h-4 px-1">Elective</Badge>
                             )}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
                        onClick={() => handleRemoveSubject(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
