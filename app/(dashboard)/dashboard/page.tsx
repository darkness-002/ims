import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, GraduationCap, Users, Clock } from "lucide-react";
import { getInstitutions } from "@/lib/mock-data";

export default function DashboardPage() {
  const institutions = getInstitutions();
  
  // Calculate stats from mock data
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

  const stats = [
    {
      title: "Institutions",
      value: totalInstitutions,
      icon: Building2,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Programs",
      value: totalPrograms,
      icon: GraduationCap,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Departments",
      value: totalDepartments,
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Shifts",
      value: totalShifts,
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to the Institution Management System
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`rounded-full p-2 ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

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
