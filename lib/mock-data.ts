import { Institution, Shift, Program, Department } from "@/lib/types";

const institutions: Institution[] = [
  {
    id: "inst_1",
    name: "Tech Institute of Science",
    code: "TIS",
    address: "123 Tech Blvd, Silicon Valley",
    phone: "555-0101",
    email: "contact@tis.edu",
    createdAt: new Date(),
    updatedAt: new Date(),
    shifts: [
        { id: "s1", name: "Morning", startTime: "08:00", endTime: "14:00", institutionId: "inst_1", createdAt: new Date(), updatedAt: new Date() },
        { id: "s2", name: "Evening", startTime: "14:00", endTime: "20:00", institutionId: "inst_1", createdAt: new Date(), updatedAt: new Date() }
    ],
    departments: [
        { 
            id: "d1", 
            name: "Computer Science", 
            code: "CS", 
            institutionId: "inst_1", 
            createdAt: new Date(), 
            updatedAt: new Date(), 
            teachers: [],
            programs: [
                { id: "p1", name: "BS Computer Science", type: "SEMESTER_BASED", duration: 8, departmentId: "d1", createdAt: new Date(), updatedAt: new Date() },
                { id: "p2", name: "MS Data Science", type: "SEMESTER_BASED", duration: 4, departmentId: "d1", createdAt: new Date(), updatedAt: new Date() }
            ]
        },
        { 
            id: "d2", 
            name: "Mathematics", 
            code: "MATH", 
            institutionId: "inst_1", 
            createdAt: new Date(), 
            updatedAt: new Date(), 
            teachers: [],
            programs: []
        }
    ]
  },
  {
    id: "inst_2",
    name: "City Art College",
    code: "CAC",
    createdAt: new Date(),
    updatedAt: new Date(),
    shifts: [],
    departments: []
  }
];

export function getInstitutionById(id: string): Institution | undefined {
  return institutions.find((inst) => inst.id === id);
}
