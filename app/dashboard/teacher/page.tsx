import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";


const teacherSections = [
  {
    sectionId: "sec_clxateu1a000208l4fdh3d1ge",
    sectionName: "BSCS-8A",
    termNumber: 8,
    batch: {
      name: "Fall 2021",
      program: {
        name: "BS Computer Science",
      },
    },
    subject: {
      subjectId: "sub_clxateu1e000a08l41y3g4d2c",
      name: "Professional Practices",
      code: "CS-401",
    },
    shift: {
      type: "MORNING",
    },
    studentCount: 32,
  },
  {
    sectionId: "sec_clxateu1b000408l48e6t2y8h",
    sectionName: "BSCS-6B",
    termNumber: 6,
    batch: {
      name: "Fall 2022",
      program: {
        name: "BS Computer Science",
      },
    },
    subject: {
      subjectId: "sub_clxateu1f000c08l4e9j3a0b1",
      name: "Compiler Construction",
      code: "CS-308",
    },
    shift: {
      type: "MORNING",
    },
    studentCount: 45,
  },
  {
    sectionId: "sec_clxateu1c000608l4c4f3g8h2",
    sectionName: "INTER-P2-G1",
    termNumber: 2,
    batch: {
      name: "2023-2025",
      program: {
        name: "FSc Pre-Engineering",
      },
    },
    subject: {
      subjectId: "sub_clxateu1g000e08l4b9k2c7d0",
      name: "Physics",
      code: "PHY-201",
    },
    shift: {
      type: "EVENING",
    },
    studentCount: 51,
  },
];

export default function TeacherDashboard() {
  return (
    <div className="p-6">
      <PageHeader title="Teacher Dashboard" description="Manage your assigned sections, exams, and student grades." />
      
      <div className="mt-6">
        <h2 className="text-2xl font-semibold tracking-tight mb-4">My Sections</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {teacherSections.map((section) => (
            <Card key={section.sectionId}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  {section.sectionName}
                  <Badge variant={section.shift.type === 'MORNING' ? 'default' : 'secondary'}>
                    {section.shift.type}
                  </Badge>
                </CardTitle>
                <CardDescription>{section.batch.program.name} - {section.batch.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">Subject</h4>
                    <p className="text-sm text-muted-foreground">{section.subject.name} ({section.subject.code})</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Details</h4>
                    <p className="text-sm text-muted-foreground">Term: {section.termNumber}</p>
                    <p className="text-sm text-muted-foreground">Enrolled Students: {section.studentCount}</p>
                  </div>
                  <div className="flex flex-col space-y-2 pt-2">
                    {/* In a real app, these links would go to pages for managing these resources */}
                    <Link href={`/dashboard/teacher/sections/${section.sectionId}/students`}>
                      <Button variant="outline" className="w-full">View Students</Button>
                    </Link>
                    <Link href={`/dashboard/teacher/sections/${section.sectionId}/subjects/${section.subject.subjectId}/exams`}>
                      <Button variant="outline" className="w-full">Manage Exams</Button>
                    </Link>
                    <Link href={`/dashboard/teacher/sections/${section.sectionId}/subjects/${section.subject.subjectId}/results`}>
                      <Button className="w-full">Enter/View Results</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}