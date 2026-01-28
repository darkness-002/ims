
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import {
  BookMarked,
  Users,
  UserPlus,
  BookCopy,
  LayoutGrid
} from "lucide-react";
import { getDepartments, getStudentsByDepartmentCount } from "@/lib/data";

const managementLinks = [
  {
    href: "/dashboard/department/programs",
    label: "My Programs",
    icon: BookMarked,
    description: "Administer programs offered by your department.",
  },
  {
    href: "/dashboard/department/batches",
    label: "My Batches",
    icon: LayoutGrid,
    description: "Manage student cohorts/batches for your programs.",
  },
  {
    href: "/dashboard/department/teachers",
    label: "My Teachers",
    icon: UserPlus,
    description: "Assign and manage teachers within the department.",
  },
  {
    href: "/dashboard/department/students",
    label: "Enrolled Students",
    icon: Users,
    description: "View and manage student enrollments.",
  },
  {
    href: "/dashboard/department/sections",
    label: "My Sections",
    icon: BookCopy,
    description: "Create and manage sections for department batches.",
  },
];

export default async function DepartmentAdminDashboard() {
  // Simulate Session: Get the first department found
  const departments = await getDepartments();
  const myDept = departments[0];

  if (!myDept) {
     return <div>No department found. Please seed the database.</div>;
  }

  const studentsCount = await getStudentsByDepartmentCount(myDept.id);

  const departmentStats = {
    programs: myDept.programs?.length || 0,
    teachers: myDept.teachers?.length || 0,
    students: studentsCount,
  };

  return (
    <div className="p-6">
      <PageHeader
        title={`${myDept.name} Dashboard`}
        description={`Manage programs, teachers, and students for the ${myDept.name} department.`}
      />

      {/* Stats Cards */}
      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <StatCard Icon={BookMarked} title="My Programs" value={departmentStats.programs} />
        <StatCard Icon={UserPlus} title="Assigned Teachers" value={departmentStats.teachers} />
        <StatCard Icon={Users} title="Enrolled Students" value={departmentStats.students} />
      </div>

      {/* Management Actions */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold tracking-tight mb-4">Department Management</h2>
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