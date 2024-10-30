"use client";

import React, { useEffect, useState } from "react";
import { DataTable } from "./_components/data-table";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { ColumnDef, PaginationState } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react";
import { Company } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

const CompaniesPage = () => {
  const { userId, role } = useAuth();
  const [pageCount, setPageCount] = useState(0);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [refresh, setRefresh] = useState<boolean>(false);
  const [companies, setCompanies] = useState([]);
  const columns: ColumnDef<Company>[] = [
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
              <Link href={`/admin/companies/${id}`}>
                <DropdownMenuItem>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  useEffect(() => {
    async function fetchData(pagination: PaginationState) {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/companies?page=${
            pagination.pageIndex + 1
          }&per_page=${pagination.pageSize}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (res.status == 200) {
          setCompanies(res.data.data);
          setPageCount(res.data.last_page);
        }
      } catch (error: any) {
        if (error.response) {
          console.log(error.response);
        }
      }
    }
    if (userId) {
      void fetchData(pagination);
    }
  }, [userId, refresh, role, pagination]);

  return (
    <div className="p-6">
      <DataTable columns={columns} data={companies} pagination={pagination} setPagination={setPagination} />
    </div>
  );
};

export default CompaniesPage;
