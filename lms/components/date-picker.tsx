"use client";

import { memo, type FC } from "react";

import { Calendar } from "./ui/calendar"
import {
  SidebarGroup,
  SidebarGroupContent,
} from "./ui/sidebar"

const DatePickerComponent : FC = () => {
  return (
    <SidebarGroup className="px-0">
      <SidebarGroupContent>
        <Calendar className="[&_[role=gridcell].bg-accent]:bg-sidebar-primary [&_[role=gridcell].bg-accent]:text-sidebar-primary-foreground [&_[role=gridcell]]:w-[33px]" />
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

export const DatePicker = memo(DatePickerComponent)