"use client";

import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "./_components/data-table";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Category } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Pencil, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const CategoriesPage = () => {
  const { userId, role } = useAuth();
  const [refresh, setRefresh] = useState<boolean>(false);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState<string>("");
  const [selectedId, setSelectedId] = useState<string>("");
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const columns: ColumnDef<Category>[] = [
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
        const { id, name } = row.original;
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
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setEdit(true);
                      setSelectedId(id);
                      setName(name);
                    }}
                  >
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </DialogTrigger>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button
                  variant="ghost"
                  onClick={() => {
                    deleteCategory(id);
                  }}
                >
                  <X className="h-4 w-4 mr-2" />
                  Delete
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
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/categories`,
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
        setCategories(res.data);
      }
    } catch (error: any) {
      if (error.response) {
        console.log(error.response);
      }
    }
  }

  const upsert = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/categories/${
          edit ? "edit" : "add"
        }`,
        JSON.stringify({
          categoryId: selectedId,
          name: name,
        }),
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status == 200) {
        toast.success("Success");
        setName("");
        setSelectedId("");
        setRefresh((prev) => !prev);
      }
    } catch (error: any) {
      if (error.response) {
        console.log(error.response);
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/categories/delete`,
        JSON.stringify({
          categoryId: id,
        }),
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status == 200) {
        toast.success("Success");
        setName("");
        setSelectedId("");
        setRefresh((prev) => !prev);
      }
    } catch (error: any) {
      if (error.response) {
        console.log(error.response);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      void getData();
    }
  }, [userId, refresh]);
  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          setEdit(true);
          setSelectedId("");
          setName("");
        }
      }}
    >
      <div className="p-6">
        <DataTable columns={columns} data={categories} />
      </div>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{edit ? "Edit Category" : "Add Category"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Art"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" disabled={loading} onClick={upsert}>
            {edit ? "Edit" : "Add"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CategoriesPage;
