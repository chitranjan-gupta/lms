"use client";

import { type ComponentProps, memo, type FC } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "./ui/sidebar";

import { NavMain } from "./nav-main";
import { TeamSwitcher } from "./team-switcher";
import { NavUser } from "./nav-user";
import { NavPrimary } from "./nav-primary";

type SidebarLeftProps = ComponentProps<typeof Sidebar> & {
  teams: any;
  navMain: any;
  navPrimary: any;
  user: any;
  handleLogout: () => Promise<void>;
  handleApply: () => Promise<void>;
};

const SidebarLeftComponent: FC<SidebarLeftProps> = ({
  teams,
  navMain,
  navPrimary,
  user,
  handleLogout,
  handleApply,
  ...props
}) => {
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
        <NavUser
          user={user}
          handleLogout={handleLogout}
          handleApply={handleApply}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export const SidebarLeft = memo(SidebarLeftComponent);
