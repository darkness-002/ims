
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, GraduationCap, Users, Clock } from "lucide-react";

type Stat = {
  title: string;
  value: number;
  icon: React.ElementType;
  color: string;
  bgColor: string;
};

interface DashboardStatsProps {
  totalInstitutions: number;
  totalPrograms: number;
  totalDepartments: number;
  totalShifts: number;
}

export function DashboardStats({
  totalInstitutions,
  totalPrograms,
  totalDepartments,
  totalShifts,
}: DashboardStatsProps) {
  const stats: Stat[] = [
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
  );
}
