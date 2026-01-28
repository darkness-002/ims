import { getDepartments } from "@/lib/data";
import DepartmentProgramsClientPage from "./client-page";

export default async function DepartmentProgramsPage() {
  // Simulate Session: Get the first department found
  const departments = await getDepartments();
  const myDept = departments[0];

  if (!myDept) {
     return <div>No department found.</div>;
  }

  // Ensure programs are loaded (getDepartments includes them in lib/data.ts)
  const programs = myDept.programs || [];

  return (
    <DepartmentProgramsClientPage
      programs={programs}
      departmentId={myDept.id}
      departmentName={myDept.name}
    />
  );
}
