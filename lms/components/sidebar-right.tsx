"use client";

import { type ComponentProps, memo, type FC } from "react";
import { Plus } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "./ui/sidebar";

import { Calendars } from "./calendars";
import { DatePicker } from "./date-picker";
import { SearchForm } from "./search-form";
import { NavFavorites } from "./nav-favorites";
import { NavWorkspaces } from "./nav-workspaces";

type SidebarRightProps = ComponentProps<typeof Sidebar> & {
  calendars: any;
  favorites: any;
  workspaces: any;
};

const SidebarRightComponent: FC<SidebarRightProps> = ({
  calendars,
  favorites,
  workspaces,
  ...props
}) => {
  return (
    <Sidebar
      side="right"
      collapsible="icon"
      variant="floating"
      className="sticky hidden md:flex top-0 w-80"
      {...props}
    >
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        <DatePicker />
        <SidebarSeparator className="mx-0" />
        <Calendars calendars={calendars} />
        <NavFavorites favorites={favorites} />
        <NavWorkspaces workspaces={workspaces} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Plus />
              <span>New Calendar</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export const SidebarRight = memo(SidebarRightComponent);
