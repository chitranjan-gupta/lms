"use client";

import { useEffect } from "react";

import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

import { useUser } from "@/hooks";
import { useUsers } from "@/core";

const UsersPage = () => {
  const { user } = useUser();
  const { users, getUsers } = useUsers();
  useEffect(() => {
    if(user){
      (async () => {
        await getUsers();
      })()
    }
  }, [user, getUsers]);

  return (
    <div className="p-6">
      <DataTable columns={columns} data={users} />
    </div>
  );
};

export default UsersPage;
