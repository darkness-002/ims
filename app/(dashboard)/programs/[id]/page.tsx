


import { getProgramById, getInstitutionById, getDepartmentById, getProgramCurriculum, getSubjects } from '@/lib/data';
import ProgramDetailClientPage from './client-page';

interface ProgramDetailPageProps {
  params: {
    id: string;
  };
}

export default async function ProgramDetailPage({ params }: ProgramDetailPageProps) {
  const program = await getProgramById(params.id);

  if (!program) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-muted-foreground">Program not found</p>
      </div>
    );
  }

  // Fetch Department to get Institution ID
  const department = await getDepartmentById(program.departmentId);
  const institution = department ? await getInstitutionById(department.institutionId) : null;
  
  // Fetch Curriculum and Subjects
  const curriculum = await getProgramCurriculum(program.id);
  const allSubjects = institution ? await getSubjects(institution.id) : [];

  return (
    <ProgramDetailClientPage
      program={program}
      institution={institution}
      curriculum={curriculum}
      allSubjects={allSubjects}
    />
  );
}


