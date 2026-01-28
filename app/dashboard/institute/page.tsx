
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import {
  Building2,
  BookMarked,
  Users,
  GraduationCap,
  Clock,
} from "lucide-react";
import { getDepartments, getPrograms, getTeachers, getTotalStudents } from "@/lib/data";

const managementLinks = [
  {
    href: "/departments",
    label: "Manage Departments",
    icon: Building2,
    description: "Define and organize academic departments.",
  },
  {
    href: "/programs",
    label: "Manage Programs",
    icon: BookMarked,
    description: "Create and structure degree and certificate programs.",
  },
  {
    href: "/shifts",
    label: "Manage Shifts",
    icon: Clock,
    description: "Set up morning, evening, and other operational shifts.",
  },
  {
    href: "/institutions",
    label: "Manage Institutions",
    icon: Building2,
    description: "Overview and manage all institutions.",
  },
];

export default async function InstituteAdminDashboard() {
  const departments = await getDepartments();
  const programs = await getPrograms();
  const teachers = await getTeachers();
  const studentsCount = await getTotalStudents();

  const stats = {
    departments: departments.length,
    programs: programs.length,
    students: studentsCount,
    teachers: teachers.length,
  };

  return (
    <div className="p-6">
      <PageHeader
        title="Institution Dashboard"
        description="Oversee and manage all aspects of your institution from one central hub."
      />

      {/* Stats Cards */}
      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard Icon={Building2} title="Total Departments" value={stats.departments} />
        <StatCard Icon={BookMarked} title="Total Programs" value={stats.programs} />
        <StatCard Icon={Users} title="Total Students" value={stats.students} />
        <StatCard Icon={GraduationCap} title="Total Teachers" value={stats.teachers} />
      </div>

      {/* Management Actions */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold tracking-tight mb-4">Management Console</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {managementLinks.map((link) => (
            <Link href={link.href} key={link.href}>
                <Card className="hover:bg-muted/50 transition-colors h-full">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-lg font-medium">{link.label}</CardTitle>
                        <link.icon className="h-6 w-6 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">{link.description}</p>
                    </CardContent>
                </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// Helper component for stat cards
function StatCard({ Icon, title, value }: { Icon: React.ElementType; title: string; value: number | string }) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
            </CardContent>
        </Card>
    )
}