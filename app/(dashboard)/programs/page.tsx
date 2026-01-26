
import { getInstitutions, getPrograms } from '@/lib/data';
import ProgramsClientPage from './client-page';
import { Program } from '@/lib/types';

export default async function ProgramsPage() {
  const institutions = await getInstitutions();
  const programs = await getPrograms();

  const programsWithInstitutionName = programs.map((prog: Program) => ({
    ...prog,
    institutionName: institutions.find((inst) => inst.id === prog.institutionId)?.name || 'N/A',
  }));

  return <ProgramsClientPage programs={programsWithInstitutionName} institutions={institutions} />;
}
