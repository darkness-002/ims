// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type ProgramType = "SEMESTER_BASED" | "ANNUAL_BASED";
export type StudentStatus = "ACTIVE" | "GRADUATED" | "DROPPED" | "SUSPENDED";
export type ExamType = "MID_TERM" | "FINAL_TERM" | "QUIZ" | "ASSIGNMENT";
export type AttendanceStatus = "PRESENT" | "ABSENT" | "LATE" | "EXCUSED";

export interface Institution {
  id: string;
  name: string;
  code: string;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  createdAt: Date;
  updatedAt: Date;
  shifts?: Shift[];
  departments?: Department[];
  // Programs are now under Departments
}

export interface Shift {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  institutionId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Program {
  id: string;
  name: string;
  type: ProgramType;
  code?: string | null;
  duration: number;
  departmentId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Department {
  id: string;
  name: string;
  code?: string | null;
  institutionId: string;
  createdAt: Date;
  updatedAt: Date;
  teachers?: Teacher[];
  programs?: Program[];
}

export interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  email?: string | null;
  phone?: string | null;
  departmentId: string;
  institutionId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  rollNumber: string;
  email?: string | null;
  phone?: string | null;
  status: StudentStatus;
  institutionId: string;
  batchId: string;
  createdAt: Date;
  updatedAt: Date;
  batch?: Batch;
}

export interface Batch {
  id: string;
  name: string;
  startDate: Date;
  endDate?: Date | null;
  isActive: boolean;
  programId: string;
  program?: Program;
}

export interface Section {
  id: string;
  name: string;
  termNumber: number;
  batchId: string;
  shiftId: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  credits: number;
  institutionId: string;
}

export interface SubjectAllocation {
  id: string;
  sectionId: string;
  subjectId: string;
  teacherId?: string | null;
  subject?: Subject;
  teacher?: Teacher;
}

export interface Exam {
  id: string;
  title: string;
  type: ExamType;
  totalMarks: number;
  date: Date;
  subjectAllocationId: string;
}

export interface Result {
  id: string;
  marksObtained: number;
  examId: string;
  studentId: string;
  exam?: Exam;
}


// Form input types (for create/update)
export interface InstitutionInput {
  name: string;
  code: string;
  address?: string;
  phone?: string;
  email?: string;
}

export interface ShiftInput {
  name: string;
  startTime: string;
  endTime: string;
  institutionId: string;
}

export interface ProgramInput {
  name: string;
  type: ProgramType;
  code?: string;
  duration: number;
  departmentId: string;
}

export interface DepartmentInput {
  name: string;
  code?: string;
  institutionId: string;
}

export interface TeacherInput {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  departmentId: string;
  institutionId: string;
}

export interface BatchInput {
  name: string;
  startDate: Date;
  endDate?: Date;
  programId: string;
  isActive: boolean;
}

export interface StudentInput {
  firstName: string;
  lastName: string;
  rollNumber: string;
  email?: string;
  phone?: string;
  batchId: string;
  institutionId: string;
  status: StudentStatus;
}
