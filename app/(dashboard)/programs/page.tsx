
import { getInstitutions, getPrograms } from '@/lib/data';
import ProgramsClientPage from './client-page';

export default async function ProgramsPage() {
  const institutions = await getInstitutions();
  const programs = await getPrograms();

  const programsWithInstitutionName = programs.map((prog) => {
    let institutionName = 'N/A';
    for (const inst of institutions) {
       if (inst.departments?.some((dept) => dept.id === prog.departmentId)) {
          institutionName = inst.name;
          break;
       }
    }
    return { ...prog, institutionName };
  });

  return <ProgramsClientPage programs={programsWithInstitutionName} institutions={institutions} />;
}
