"use client";

import axios from "axios";
import Loader from "@/components/loader";
import { useAuth } from "@/context/AuthContext";
import { Company, Career } from "@prisma/client";
import React, { useEffect, useState, Suspense } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef, PaginationState } from "@tanstack/react-table";
import {
  ArrowUpDown,
  MoreHorizontal,
  Pencil,
  PlusCircle,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { DataTable } from "./_components/data-table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const CareersPage = ({ params }: { params: { companyId: string } }) => {
  const { userId } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [careers, setCareers] = useState<Career[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const columns: ColumnDef<Career>[] = [
    {
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const { id, companyId } = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-4 w-8 p-0">
                <span className="sr-only">Open Menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Link href={`/admin/companies/${companyId}/careers/${id}`}>
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

  async function addCareer() {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/companies/${params.companyId}/careers`,
        JSON.stringify({
          companyId: params.companyId,
          title: title,
        }),
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status == 200) {
        router.push(
          `/admin/companies/${params.companyId}/careers/${res.data.id}`
        );
      }
    } catch (error: any) {
      if (error.response) {
        console.log(error.response);
      }
    }
  }

  useEffect(() => {
    async function getData(pagination: PaginationState) {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/companies/${params.companyId}/careers?page=${pagination.pageIndex + 1}&per_page=${pagination.pageSize}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (res.status == 200) {
          console.log(res.data);
          setCareers(res.data.data);
          setPageCount(res.data.last_page);
        }
      } catch (error: any) {
        if (error.response) {
          console.log(error.response);
        }
      }
    }
    if (userId) {
      void getData(pagination);
      console.log("Ks")
    }
  }, [params.companyId, userId, pagination]);

  return (
    <Suspense fallback={<Loader />}>
      <div className="flex flexr-row justify-between items-start">
        <div>
          <Link
            href={`/admin/companies/${params.companyId}`}
            className="flex items-center text-sm hover:opacity-75 transition mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to careers
          </Link>
        </div>

        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <PlusCircle className="h-4 w-4 mr-2" />
                New Career
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Career</DialogTitle>
                <DialogDescription>Add Career</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    className="col-span-3"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={addCareer}>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <DataTable columns={columns} data={careers} pagination={pagination} setPagination={setPagination} />
    </Suspense>
  );
};

export default CareersPage;
