"use client";

import { useEffect, useCallback } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, BadgeCheck, CircleX } from "lucide-react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

import { DataTable } from "./_components/data-table";

import { useUser } from "@/hooks";
import { useApplications } from "@/core";
import { cn } from "@/lib";

import type { Application } from "@/types";

const ApplicationsPage = () => {
  const { user } = useUser();
  const {
    applications,
    getApplications,
    approveApplications,
    rejectApplications,
  } = useApplications();
  const approve = useCallback(
    async (id: string) => {
      try {
        await approveApplications(id);
        toast.success("Approved");
      } catch (error: any) {
        console.log(error);
      }
    },
    [approveApplications]
  );
  const reject = useCallback(async (id: string) => {
    try {
      await rejectApplications(id);
      toast.success("Rejected");
    } catch (error: any) {
      console.log(error);
    }
  }, [rejectApplications]);
  const columns: ColumnDef<Application>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "isAccepted",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Approved
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const isAccepted = row.getValue("isAccepted") || false;
        return (
          <Badge className={cn("bg-slate-500", isAccepted && "bg-sky-700")}>
            {isAccepted ? String(isAccepted) : "Not Accepted"}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const { id } = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-4 w-8 p-0">
                <span className="sr-only">Open Menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Button
                  variant="ghost"
                  className="flex flex-row items-center gap-x-2"
                  onClick={() => approve(id)}
                >
                  <BadgeCheck className="h-4 w-4" />
                  Approve
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button
                  variant="ghost"
                  className="flex flex-row items-center gap-x-2"
                  onClick={() => reject(id)}
                >
                  <CircleX className="h-4 w-4" />
                  Reject
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  useEffect(() => {
    if (user) {
      (async () => {
        await getApplications();
      })()
    }
  }, [getApplications, user]);
  return (
    <div className="p-6">
      <DataTable columns={columns} data={applications} />
    </div>
  );
};

export default ApplicationsPage;
