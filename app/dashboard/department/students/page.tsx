import { getDepartments, getBatchesByDepartment, getStudentsByDepartment } from "@/lib/data";
import DepartmentStudentsClientPage from "./client-page";

export default async function DepartmentStudentsPage() {
  // Simulate Session
  const departments = await getDepartments();
  const myDept = departments[0];

  if (!myDept) {
     return <div>No department found.</div>;
  }

  const students = await getStudentsByDepartment(myDept.id);
  const batches = await getBatchesByDepartment(myDept.id);

  return (
    <DepartmentStudentsClientPage
      students={students}
      batches={batches}
      departmentId={myDept.id}
      departmentName={myDept.name}
      institutionId={myDept.institutionId}
    />
  );
}
