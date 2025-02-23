"use client";

import { type ComponentProps } from "react";
import { Plus } from "lucide-react";

import { Calendars } from "@/components/calendars";
import { DatePicker } from "@/components/date-picker";
import { SearchForm } from "@/components/search-form";
import { NavFavorites } from "@/components/nav-favorites";
import { NavWorkspaces } from "@/components/nav-workspaces";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";

export function SidebarRight({
  calendars,
  favorites,
  workspaces,
  ...props
}: ComponentProps<typeof Sidebar> & { calendars:any; favorites:any; workspaces:any }) {
  return (
    <Sidebar side="right" collapsible="icon" variant="floating" className="sticky hidden md:flex top-0 w-80" {...props}>
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
}
