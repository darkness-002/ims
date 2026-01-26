
import { getProgramById, getInstitutionById } from '@/lib/data';
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

  const institution = await getInstitutionById(program.institutionId);

  return (
    <ProgramDetailClientPage
      program={program}
      institution={institution}
    />
  );
}
