import { getUsers, removeUser } from "@/api";
import { User } from "@/types";
import { create } from "zustand";

interface Users {
  users: User[];
  getUsers: () => Promise<void>;
  addUsers: () => Promise<void>;
  removeUsers: (removeUserId: string) => Promise<void>;
}

export const useUsers = create<Users>()((set) => ({
  users: [],
  getUsers: async () => {
    const data = await getUsers();
    if (data) {
      set({ users: data });
    }
  },
  addUsers: async () => {
    const data = await getUsers();
    if (data) {
      set((state) => ({ users: [...state.users, ...data] }));
    }
  },
  removeUsers: async (removeUserId: string) => {
    const data = await removeUser(removeUserId);
    if (data) {
      set((state) => ({
        users: state.users.filter((user) => user.id !== data.id),
      }));
    }
  },
}));

export const removeUsers = async (removeUserId: string) =>
  useUsers.getState().removeUsers(removeUserId);
