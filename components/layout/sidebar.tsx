"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Building2,
  GraduationCap,
  Users,
  Clock,
  LayoutDashboard,
  ChevronLeft,
  Menu,
  BookOpen,
  User,
  FileText,
  CalendarDays,
  Shield,
  BookMarked,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";

// Institute Admin Navigation
const instituteNav = [
  {
    name: "Dashboard",
    href: "/dashboard/institute",
    icon: LayoutDashboard,
  },
  {
    name: "Institutions",
    href: "/dashboard/institutions", // Assuming these routes exist or will exist under dashboard
    icon: Building2,
  },
  {
    name: "Departments",
    href: "/dashboard/departments",
    icon: Users,
  },
  {
    name: "Programs",
    href: "/dashboard/programs",
    icon: GraduationCap,
  },
  {
    name: "Shifts",
    href: "/dashboard/shifts",
    icon: Clock,
  },
  {
    name: "Teachers",
    href: "/dashboard/teachers",
    icon: User,
  },
];

// Department Admin Navigation
const departmentNav = [
  {
    name: "Dashboard",
    href: "/dashboard/department",
    icon: LayoutDashboard,
  },
  {
    name: "My Programs",
    href: "/dashboard/department/programs",
    icon: GraduationCap,
  },
  {
    name: "Teachers",
    href: "/dashboard/department/teachers",
    icon: User,
  },
  {
    name: "Sections",
    href: "/dashboard/department/sections",
    icon: Users,
  },
  {
    name: "Subjects",
    href: "/dashboard/department/subjects",
    icon: BookOpen,
  },
];

// Teacher Navigation
const teacherNav = [
  {
    name: "Dashboard",
    href: "/dashboard/teacher",
    icon: LayoutDashboard,
  },
  {
    name: "My Sections",
    href: "/dashboard/teacher/sections",
    icon: Users,
  },
  {
    name: "Schedule",
    href: "/dashboard/teacher/schedule",
    icon: CalendarDays,
  },
  {
    name: "Exams",
    href: "/dashboard/teacher/exams",
    icon: FileText,
  },
  {
    name: "Results",
    href: "/dashboard/teacher/results",
    icon: BookMarked,
  },
];

// Student Navigation
const studentNav = [
  {
    name: "Dashboard",
    href: "/dashboard/student",
    icon: LayoutDashboard,
  },
  {
    name: "My Courses",
    href: "/dashboard/student/courses",
    icon: BookOpen,
  },
  {
    name: "Results",
    href: "/dashboard/student/results",
    icon: FileText,
  },
  {
    name: "Schedule",
    href: "/dashboard/student/schedule",
    icon: CalendarDays,
  },
  {
    name: "Attendance",
    href: "/dashboard/student/attendance",
    icon: CheckCircle,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const { navItems, dashboardRoot, roleLabel } = useMemo(() => {
    if (pathname.startsWith("/dashboard/teacher")) {
      return { 
        navItems: teacherNav, 
        dashboardRoot: "/dashboard/teacher",
        roleLabel: "Teacher"
      };
    } else if (pathname.startsWith("/dashboard/department")) {
      return { 
        navItems: departmentNav, 
        dashboardRoot: "/dashboard/department",
        roleLabel: "Dept. Admin"
      };
    } else if (pathname.startsWith("/dashboard/student")) {
      return { 
        navItems: studentNav, 
        dashboardRoot: "/dashboard/student",
        roleLabel: "Student"
      };
    } else {
      // Default to Institute Admin
      return { 
        navItems: instituteNav, 
        dashboardRoot: "/dashboard/institute",
        roleLabel: "Inst. Admin"
      };
    }
  }, [pathname]);

  return (
    <aside
      className={cn(
        "flex flex-col border-r bg-card transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo / Header */}
      <div className="flex h-16 items-center justify-between border-b px-4">
        {!collapsed && (
          <Link href={dashboardRoot} className="flex items-center gap-2 overflow-hidden">
            <div className="rounded bg-primary p-1">
               <Shield className="h-4 w-4 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-none">IMS</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                {roleLabel}
              </span>
            </div>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className={cn(collapsed && "mx-auto")}
        >
          {collapsed ? (
            <Menu className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-2">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                collapsed && "justify-center px-2"
              )}
              title={collapsed ? item.name : undefined}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      
    </aside>
  );
}
