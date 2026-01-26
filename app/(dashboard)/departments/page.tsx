
import { getInstitutions, getDepartments } from '@/lib/data';
import DepartmentsClientPage from './client-page';
import { Department } from '@/lib/types';

export default async function DepartmentsPage() {
  const institutions = await getInstitutions();
  const departments = await getDepartments();

  const departmentsWithInstitutionName = departments.map((dept: Department) => ({
    ...dept,
    institutionName: institutions.find((inst) => inst.id === dept.institutionId)?.name || 'N/A',
  }));

  return <DepartmentsClientPage departments={departmentsWithInstitutionName} institutions={institutions} />;
}
