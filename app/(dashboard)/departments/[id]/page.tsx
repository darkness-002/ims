
import { getDepartmentById, getInstitutionById } from '@/lib/data';
import DepartmentDetailClientPage from './client-page';

interface DepartmentDetailPageProps {
  params: {
    id: string;
  };
}

export default async function DepartmentDetailPage({ params }: DepartmentDetailPageProps) {
  const department = await getDepartmentById(params.id);
  if (!department) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-muted-foreground">Department not found</p>
      </div>
    );
  }

  const institution = await getInstitutionById(department.institutionId);

  return (
    <DepartmentDetailClientPage
      department={department}
      institution={institution}
      teachers={department.teachers || []}
    />
  );
}
