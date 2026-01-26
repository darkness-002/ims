
import { getInstitutionById } from '@/lib/data';
import InstitutionDetailClientPage from './client-page';

interface InstitutionDetailPageProps {
  params: {
    id: string;
  };
}

export default async function InstitutionDetailPage({ params }: InstitutionDetailPageProps) {
  const institution = await getInstitutionById(params.id);

  if (!institution) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-muted-foreground">Institution not found</p>
      </div>
    );
  }

  return <InstitutionDetailClientPage institution={institution} />;
}
