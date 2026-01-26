import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2 } from "lucide-react";
import { getInstitutions } from "@/lib/data";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";

export default async function DashboardPage() {
  const institutions = await getInstitutions();
  
  // Calculate stats from fetched data
  const totalInstitutions = institutions.length;
  const totalPrograms = institutions.reduce(
    (acc, inst) => acc + (inst.programs?.length || 0),
    0
  );
  const totalDepartments = institutions.reduce(
    (acc, inst) => acc + (inst.departments?.length || 0),
    0
  );
  const totalShifts = institutions.reduce(
    (acc, inst) => acc + (inst.shifts?.length || 0),
    0
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to the Institution Management System
        </p>
      </div>

      {/* Stats Grid */}
      <DashboardStats
        totalInstitutions={totalInstitutions}
        totalPrograms={totalPrograms}
        totalDepartments={totalDepartments}
        totalShifts={totalShifts}
      />

      {/* Recent Institutions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Institutions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {institutions.map((institution) => (
              <div
                key={institution.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Building2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{institution.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {institution.code} • {institution.departments?.length || 0} departments
                    </p>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {institution.email}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
