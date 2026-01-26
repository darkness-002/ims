import { Institution, Shift, Program, Department, Teacher } from "./types";

// ============================================================================
// MOCK DATA - Replace with real database calls later
// ============================================================================

export const mockTeachers: Teacher[] = [
  {
    id: "teacher-1",
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@university.edu",
    phone: "+1-555-0101",
    departmentId: "dept-1",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "teacher-2",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@university.edu",
    phone: "+1-555-0102",
    departmentId: "dept-1",
    createdAt: new Date("2024-02-20"),
    updatedAt: new Date("2024-02-20"),
  },
  {
    id: "teacher-3",
    firstName: "Michael",
    lastName: "Williams",
    email: "michael.williams@university.edu",
    phone: "+1-555-0103",
    departmentId: "dept-2",
    createdAt: new Date("2024-03-10"),
    updatedAt: new Date("2024-03-10"),
  },
  {
    id: "teacher-4",
    firstName: "Emily",
    lastName: "Brown",
    email: "emily.brown@university.edu",
    phone: "+1-555-0104",
    departmentId: "dept-3",
    createdAt: new Date("2024-04-05"),
    updatedAt: new Date("2024-04-05"),
  },
];

export const mockDepartments: Department[] = [
  {
    id: "dept-1",
    name: "Computer Science",
    code: "CS",
    institutionId: "inst-1",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
    teachers: mockTeachers.filter((t) => t.departmentId === "dept-1"),
  },
  {
    id: "dept-2",
    name: "Mathematics",
    code: "MATH",
    institutionId: "inst-1",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
    teachers: mockTeachers.filter((t) => t.departmentId === "dept-2"),
  },
  {
    id: "dept-3",
    name: "Physics",
    code: "PHY",
    institutionId: "inst-1",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
    teachers: mockTeachers.filter((t) => t.departmentId === "dept-3"),
  },
  {
    id: "dept-4",
    name: "Business Administration",
    code: "BA",
    institutionId: "inst-2",
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-02-01"),
    teachers: [],
  },
];

export const mockPrograms: Program[] = [
  {
    id: "prog-1",
    name: "Bachelor of Science in Computer Science",
    type: "UNDERGRADUATE",
    code: "BSCS",
    institutionId: "inst-1",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "prog-2",
    name: "Master of Science in Computer Science",
    type: "GRADUATE",
    code: "MSCS",
    institutionId: "inst-1",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "prog-3",
    name: "Bachelor of Business Administration",
    type: "UNDERGRADUATE",
    code: "BBA",
    institutionId: "inst-2",
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-02-01"),
  },
  {
    id: "prog-4",
    name: "Master of Business Administration",
    type: "GRADUATE",
    code: "MBA",
    institutionId: "inst-2",
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-02-01"),
  },
];

export const mockShifts: Shift[] = [
  {
    id: "shift-1",
    name: "Morning",
    startTime: "08:00",
    endTime: "12:00",
    institutionId: "inst-1",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "shift-2",
    name: "Afternoon",
    startTime: "13:00",
    endTime: "17:00",
    institutionId: "inst-1",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "shift-3",
    name: "Evening",
    startTime: "18:00",
    endTime: "21:00",
    institutionId: "inst-1",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "shift-4",
    name: "Full Day",
    startTime: "09:00",
    endTime: "17:00",
    institutionId: "inst-2",
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-02-01"),
  },
];

export const mockInstitutions: Institution[] = [
  {
    id: "inst-1",
    name: "State University",
    code: "SU",
    address: "123 University Ave, City, State 12345",
    phone: "+1-555-1000",
    email: "info@stateuniversity.edu",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
    shifts: mockShifts.filter((s) => s.institutionId === "inst-1"),
    programs: mockPrograms.filter((p) => p.institutionId === "inst-1"),
    departments: mockDepartments.filter((d) => d.institutionId === "inst-1"),
  },
  {
    id: "inst-2",
    name: "City College",
    code: "CC",
    address: "456 College Blvd, Town, State 67890",
    phone: "+1-555-2000",
    email: "contact@citycollege.edu",
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-02-01"),
    shifts: mockShifts.filter((s) => s.institutionId === "inst-2"),
    programs: mockPrograms.filter((p) => p.institutionId === "inst-2"),
    departments: mockDepartments.filter((d) => d.institutionId === "inst-2"),
  },
];

// ============================================================================
// MOCK DATA ACCESS FUNCTIONS
// ============================================================================

export function getInstitutions(): Institution[] {
  return mockInstitutions;
}

export function getInstitutionById(id: string): Institution | undefined {
  return mockInstitutions.find((i) => i.id === id);
}

export function getDepartmentById(id: string): Department | undefined {
  return mockDepartments.find((d) => d.id === id);
}

export function getProgramById(id: string): Program | undefined {
  return mockPrograms.find((p) => p.id === id);
}

export function getTeachersByDepartment(departmentId: string): Teacher[] {
  return mockTeachers.filter((t) => t.departmentId === departmentId);
}
