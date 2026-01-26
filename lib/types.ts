// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type ProgramType = "GRADUATE" | "UNDERGRADUATE";

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
  programs?: Program[];
  departments?: Department[];
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
  institutionId: string;
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
}

export interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  email?: string | null;
  phone?: string | null;
  departmentId: string;
  createdAt: Date;
  updatedAt: Date;
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
  institutionId: string;
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
}
