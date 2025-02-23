import { createContext, type Dispatch, type SetStateAction } from "react";
import type { SignUpState, User } from "@/types";

interface UserContextType {
  status: string; //'idle' | 'pending'
  isloading: boolean;
  error: string | null;
  user: User | null;
  editUser: Dispatch<SetStateAction<User | null>>;
  saveUser: (user: User) => Promise<void>;
  setUser: (data: SignUpState) => Promise<boolean>;
  getUser: () => Promise<void>;
  removeUser: () => Promise<void>;
  hydrate: () => Promise<void>;
  apply: () => Promise<void>;
}

// Set up a default value for the context
const defaultContextValue: UserContextType = {
  status: "idle",
  isloading: false,
  error: null,
  user: null,
  editUser: () => {},
  saveUser: async (user: User) => {
    console.log(user);
  },
  setUser: async (data: SignUpState) => {
    console.log(data);
    return false;
  },
  getUser: async () => {},
  removeUser: async () => {},
  hydrate: async () => {},
  apply: async () => {}
};

// Create the context with the default value
export const UserContext = createContext<UserContextType>(defaultContextValue);
