"use client";

import { memo, type ReactNode, type FC } from "react";

import { NavActions } from "@/components/nav-actions";
import { SidebarLeft } from "@/components/sidebar-left";
import { SidebarRight } from "@/components/sidebar-right";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

interface DashboardProps {
  data: any;
  children: ReactNode;
  handleLogout: () => Promise<void>;
  handleApply: () => Promise<void>;
}

const DashboardComponent: FC<DashboardProps> = ({ children, data, handleLogout, handleApply }) => {
  return (
    <SidebarProvider>
      <SidebarLeft
        teams={data.teams}
        navMain={data.navMain}
        navPrimary={data.navPrimary}
        user={data.user}
        handleLogout={handleLogout}
        handleApply={handleApply}
      />
      <SidebarInset>
        <header className="sticky top-0 flex h-14 shrink-0 items-center gap-2 bg-background border-b">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto px-3">
            <NavActions />
          </div>
        </header>
        <div className="">{children}</div>
      </SidebarInset>
      <SidebarRight
        calendars={data.calendars}
        favorites={data.favorites}
        workspaces={data.workspaces}
      />
    </SidebarProvider>
  );
};

export const Dashboard = memo(DashboardComponent);
