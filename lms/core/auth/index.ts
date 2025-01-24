import { login, register, logout } from "@/api";
import type { TokenType, User as UserType } from "@/types";
import { create } from "zustand";

interface AuthState {
  user: UserType | null;
  status: "idle" | "pending" | "signOut" | "signIn";
  isloading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (
    name: string,
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuth = create<AuthState>()((set) => ({
  user: null,
  status: "idle",
  isloading: false,
  login: async (username: string, password: string) => {
    set({ isloading: true });
    const data = await login(username, password);
    if (data) {
      set({ user: data, status: "signIn" });
    }
    set({ isloading: false });
  },
  register: async (
    name: string,
    username: string,
    email: string,
    password: string
  ) => {
    set({ isloading: true });
    const data = await register(name, username, email, password);
    if (data) {
      set({ user: data });
    }
    set({ isloading: false });
  },
  logout: async () => {
    set({ isloading: true });
    const data = await logout();
    if (data) {
      set({ user: null, status: "signOut" });
    }
    set({ isloading: false });
  },
}));

export const performLogout = async () => useAuth.getState().logout();
