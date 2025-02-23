"use client";

import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Pencil, X } from "lucide-react";

import { Button } from "@/components/ui/button";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { DataTable } from "./_components/data-table";

import { useUser } from "@/hooks";
import { useCategories } from "@/core";

import type { Category } from "@/types";

const CategoriesPage = () => {
  const { user } = useUser();
  const {
    categories,
    getCategories,
    editCategories,
    addCategories,
    removeCategories,
  } = useCategories();
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

  const upsert = useCallback(async () => {
    try {
      setLoading(true);
      if (edit) {
        await editCategories(selectedId, name, "admin/categories/edit");
      } else {
        await addCategories(name, "admin/categories/add");
      }
      toast.success("Success");
      setName("");
      setSelectedId("");
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [addCategories, edit, editCategories, name, selectedId]);

  const deleteCategory = useCallback(
    async (id: string) => {
      try {
        setLoading(true);
        await removeCategories(id, "admin/categories/delete");
        toast.success("Success");
        setName("");
        setSelectedId("");
      } catch (error: any) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [removeCategories]
  );

  useEffect(() => {
    if (user) {
      (async () => {
        await getCategories({ pageIndex: 1, pageSize: 10 }, "admin/categories");
      })();
    }
  }, [user, getCategories]);
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
