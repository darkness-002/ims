
import { getInstitutions, getShifts } from '@/lib/data';
import ShiftsClientPage from './client-page';
import { Shift } from '@/lib/types';

export default async function ShiftsPage() {
  const institutions = await getInstitutions();
  const shifts = await getShifts();

  const shiftsWithInstitutionName = shifts.map((shift: Shift) => ({
    ...shift,
    institutionName: institutions.find((inst) => inst.id === shift.institutionId)?.name || 'N/A',
  }));

  return <ShiftsClientPage shifts={shiftsWithInstitutionName} institutions={institutions} />;
}
