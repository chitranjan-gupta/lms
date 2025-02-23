"use client";

import { type ComponentProps } from "react";
import { NavMain } from "@/components/nav-main";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { NavPrimary } from "./nav-primary";

export function SidebarLeft({
  teams,
  navMain,
  navPrimary,
  user,
  handleLogout,
  handleApply,
  ...props
}: ComponentProps<typeof Sidebar> & {
  teams: any;
  navMain: any;
  navPrimary: any;
  user: any;
  handleLogout: () => Promise<void>;
  handleApply: () => Promise<void>;
}) {
  return (
    <Sidebar
      side="left"
      collapsible="icon"
      variant="floating"
      className="border-r-0"
      {...props}
    >
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
        <NavMain items={navMain} />
      </SidebarHeader>
      <SidebarContent>
        <NavPrimary items={navPrimary} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} handleLogout={handleLogout} handleApply={handleApply} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
