"use client";

import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  CalendarDays,
  Trophy,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";

// Mock Student Data based on the new Schema
const studentProfile = {
  name: "Afghanistan",
  rollNo: "BSCS-21-045",
  program: "BS Computer Science",
  batch: "Fall 2021",
  currentTerm: 6,
  cgpa: 3.65,
  attendance: 88,
};

// Mock Current Courses (SubjectAllocations)
const currentCourses = [
  {
    code: "CS-301",
    name: "Operating Systems",
    teacher: "I dont know",
    attendance: 92,
    credits: 3,
    nextClass: "Mon 10:00 AM",
  },
  {
    code: "CS-305",
    name: "Web Engineering",
    teacher: "Mr.",
    attendance: 85,
    credits: 3,
    nextClass: "Tue 11:30 AM",
  },
  {
    code: "CS-310",
    name: "Computer Networks",
    teacher: "Ms.",
    attendance: 78,
    credits: 4,
    nextClass: "Mon 02:00 PM",
  },
  {
    code: "MG-101",
    name: "Principles of Management",
    teacher: "Dr. t",
    attendance: 95,
    credits: 3,
    nextClass: "Wed 09:00 AM",
  },
];

// Mock Recent Results
const recentResults = [
  { subject: "Operating Systems", title: "Midterm Exam", marks: 22, total: 25, grade: "A" },
  { subject: "Web Engineering", title: "Quiz 1", marks: 8, total: 10, grade: "B+" },
  { subject: "Computer Networks", title: "Assignment 2", marks: 10, total: 10, grade: "A" },
];

export default function StudentDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Welcome, {studentProfile.name}</h1>
        <div className="flex items-center gap-3 text-muted-foreground">
            <Badge variant="outline" className="text-sm font-normal">{studentProfile.program}</Badge>
            <span>•</span>
            <span>{studentProfile.batch}</span>
            <span>•</span>
            <span>Semester {studentProfile.currentTerm}</span>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CGPA</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentProfile.cgpa}</div>
            <p className="text-xs text-muted-foreground">Cumulative Grade Point Average</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentProfile.attendance}%</div>
            <Progress value={studentProfile.attendance} className="mt-2 h-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentCourses.length}</div>
            <p className="text-xs text-muted-foreground">Current Semester</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Class</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10:00 AM</div>
            <p className="text-xs text-muted-foreground">Operating Systems</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Course Overview */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Current Semester Courses</CardTitle>
            <CardDescription>
              Your enrolled subjects and attendance status.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentCourses.map((course) => (
                <div key={course.code} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div className="space-y-1">
                    <p className="font-medium leading-none">{course.name}</p>
                    <p className="text-sm text-muted-foreground">{course.code} • {course.teacher}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                        <span className={`text-sm font-bold ${course.attendance < 75 ? "text-destructive" : "text-green-600"}`}>
                            {course.attendance}%
                        </span>
                        <p className="text-xs text-muted-foreground">Attendance</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Results */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Results</CardTitle>
            <CardDescription>
              Latest grades posted by teachers.
            </CardDescription>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
                {recentResults.map((result, i) => (
                    <div key={i} className="flex items-center justify-between">
                         <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">{result.subject}</p>
                            <p className="text-xs text-muted-foreground">{result.title}</p>
                         </div>
                         <div className="flex items-center gap-2">
                             <div className="text-sm font-medium">{result.marks}/{result.total}</div>
                             <Badge variant={result.grade.startsWith("A") ? "default" : "secondary"}>{result.grade}</Badge>
                         </div>
                    </div>
                ))}
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
