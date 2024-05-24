"use client";

import { Layout, Compass, List, BarChart, Users, Layers } from "lucide-react";
import { usePathname } from "next/navigation";
import { SidebarItem } from "./sidebar-item";
import { useAuth } from "@/context/AuthContext";

const userRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: Compass,
    label: "Browse",
    href: "/search",
  },
];

const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
  },
];

const adminRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/admin/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/admin/analytics",
  },
  {
    icon: Layers,
    label: "Categories",
    href: "/admin/categories",
  },
  {
    icon: Users,
    label: "Users",
    href: "/admin/users",
  },
  {
    icon: Users,
    label: "Teachers",
    href: "/admin/teachers",
  },
  {
    icon: Users,
    label: "Applications",
    href: "/admin/applications",
  },
];

export const SidebarRoutes = () => {
  const { role } = useAuth();
  const pathname = usePathname();
  const isTeacherPage = pathname?.includes("/teacher");
  const isAdminPage = pathname?.includes("/admin");
  const routes =
    isAdminPage && role == "admin"
      ? adminRoutes
      : isTeacherPage
      ? teacherRoutes
      : userRoutes;
  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};
