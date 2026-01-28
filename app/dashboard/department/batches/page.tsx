import { getDepartments, getBatchesByDepartment, getProgramsByDepartment } from "@/lib/data";
import DepartmentBatchesClientPage from "./client-page";

export default async function DepartmentBatchesPage() {
  // Simulate Session
  const departments = await getDepartments();
  const myDept = departments[0];

  if (!myDept) {
     return <div>No department found.</div>;
  }

  const batches = await getBatchesByDepartment(myDept.id);
  const programs = await getProgramsByDepartment(myDept.id);

  return (
    <DepartmentBatchesClientPage
      batches={batches}
      programs={programs}
      departmentName={myDept.name}
    />
  );
}
