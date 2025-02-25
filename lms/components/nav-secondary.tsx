"use client";

import {
  memo,
  type FC,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";

type NavSecondaryProps = {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    badge?: ReactNode;
  }[];
} & ComponentPropsWithoutRef<typeof SidebarGroup>;

const NavSecondaryComponent: FC<NavSecondaryProps> = ({ items, ...props }) => {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
              {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export const NavSecondary = memo(NavSecondaryComponent);
