import { getDepartments } from "@/lib/data";
import DepartmentTeachersClientPage from "./client-page";

export default async function DepartmentTeachersPage() {
  // Simulate Session: Get the first department found
  const departments = await getDepartments();
  const myDept = departments[0];

  if (!myDept) {
     return <div>No department found.</div>;
  }

  // Ensure teachers are loaded (getDepartments includes them)
  const teachers = myDept.teachers || [];

  return (
    <DepartmentTeachersClientPage
      teachers={teachers}
      departmentId={myDept.id}
      institutionId={myDept.institutionId}
      departmentName={myDept.name}
    />
  );
}
