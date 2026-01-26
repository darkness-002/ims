
import { getInstitutions } from '@/lib/data';
import InstitutionsClientPage from './client-page';

export default async function InstitutionsPage() {
  const institutions = await getInstitutions();

  return <InstitutionsClientPage institutions={institutions} />;
}
