"use client";

import React, { useEffect, useState } from "react";
import { DataTable } from "./_components/data-table";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, BadgeCheck, CircleX } from "lucide-react";
import { Course } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

const ApplicationsPage = () => {
  const { userId, role } = useAuth();
  const [refresh, setRefresh] = useState<boolean>(false);
  const [applications, setApplications] = useState([]);
  const approve = async (id: string) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/applications/approve`,
        JSON.stringify({
          applicationId: id,
        }),
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status == 200) {
        setRefresh((prev) => !prev);
        toast.success("Approved");
      }
    } catch (error: any) {
      if (error.response) {
        console.log(error.response);
      }
    }
  };
  const reject = async (id: string) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/applications/reject`,
        JSON.stringify({
          applicationId: id,
        }),
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status == 200) {
        setRefresh((prev) => !prev);
        toast.success("Rejected");
      }
    } catch (error: any) {
      if (error.response) {
        console.log(error.response);
      }
    }
  };
  const columns: ColumnDef<Course>[] = [
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
  async function getData() {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/applications`,
        JSON.stringify({
          userId: userId,
          role: role,
        }),
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status == 200) {
        console.log(res.data)
        setApplications(res.data);
      }
    } catch (error: any) {
      if (error.response) {
        console.log(error.response);
      }
    }
  }
  useEffect(() => {
    if (userId) {
      void getData();
    }
  }, [userId, refresh]);
  return (
    <div className="p-6">
      <DataTable columns={columns} data={applications} />
    </div>
  );
};

export default ApplicationsPage;
