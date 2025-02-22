"use client";

// import {
//   type Dispatch,
//   type SetStateAction,
//   createContext,
//   useContext,
//   useState,
//   useEffect,
// } from "react";
// import axios from "axios";
// import { toast } from "sonner";
// import Loader from "@/components/loader";
// import reactToast from "react-hot-toast";

// interface AuthContextProps {
//   userId: string;
//   role: string;
//   setUserId?: Dispatch<SetStateAction<string>>;
//   setRole?: Dispatch<SetStateAction<string>>;
//   logOut: () => Promise<void>;
//   apply: () => Promise<void>;
// }

// let ready = false;

import { createContext } from 'react';
import type { TokenType, SignInState } from '@/types';

interface AuthContextType {
  token: TokenType | null;
  status: string; //'idle' | 'pending' | 'signOut' | 'signIn'
  isloading: boolean;
  error: string | null;
  signIn: (data: SignInState) => Promise<void>;
  signOut: () => Promise<void>;
  refresh: (newToken: TokenType | null, logout: boolean) => Promise<void>;
  oauth: (provider: string, register: boolean) => Promise<void>;
  oauth_success: (url: string) => Promise<boolean>;
  hydrate: () => Promise<void>;
  handleLogout: () => void;
}

const defaultContextValue = {
  token: null,
  status: 'idle',
  isloading: false,
  error: null,
  signIn: async (data: SignInState) => {
    console.log(data);
  },
  signOut: async () => {},
  refresh: async (newToken: TokenType | null, logout: boolean) => {
    console.log(newToken, logout);
  },
  oauth: async (provider: string, register: boolean = true) => {
    console.log(provider, register);
  },
  oauth_success: async (url: string) => {
    console.log(url);
    return false;
  },
  hydrate: async () => {},
  handleLogout: () => {},
};

// Create the context with the default value
export const AuthContext = createContext<AuthContextType>(defaultContextValue);

// export function AuthContextProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [userId, setUserId] = useState<string>("");
//   const [role, setRole] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);
//   async function getData(refresh: boolean, path: string) {
//     try {
//       setLoading(true);
//       const res = await axios.get(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/${path}`,
//         {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       if (res.status === 200) {
//         console.log(res.data);
//         setUserId(res.data.userId);
//         setRole(res.data.role);
//       } else if (res.status === 401) {
//         setUserId("");
//         setRole("");
//       }
//     } catch (error: any) {
//       if (error.response) {
//         console.log(error.response.status);
//         console.log(error.response.data);
//         if (error.response.status == 401) {
//           toast("You are not logined");
//           setUserId("");
//           setRole("");
//           if (error.response.data === "Token Expired") {
//             if (refresh) {
//               await getData(false, "user/refresh");
//             }
//           }
//         }
//       }
//     } finally {
//       setLoading(false);
//     }
//   }
//   async function logOut() {
//     try {
//       const res = await axios.get(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/user/logout`,
//         {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       if (res.status === 200) {
//         console.log(res.data);
//         setUserId("");
//         setRole("");
//       }
//     } catch (error: any) {
//       if (error.response) {
//         console.log(error.response);
//       }
//     }
//   }
//   async function apply() {
//     try {
//       const res = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/admin/applications/apply`,
//         JSON.stringify({
//           userId: userId,
//           role: role,
//         }),
//         {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       if (res.status === 200) {
//         reactToast.success('Successfully applied for Teacher');
//       }
//     } catch (error: any) {
//       if (error.response) {
//         if(error.response.status == 400){
//           reactToast.error('Application already present');
//         }
//         console.log(error.response);
//       }
//     }
//   }
//   useEffect(() => {
//     if (process.env.NODE_ENV === "production") {
//       if (typeof window !== "undefined") {
//         void getData(true, "user/auth");
//       }
//     } else if (process.env.NODE_ENV === "development") {
//       if (ready) {
//         if (typeof window !== "undefined") {
//           void getData(true, "user/auth");
//         }
//       }
//       if (ready) {
//         ready = false;
//       } else {
//         ready = true;
//       }
//     }
//   }, []);
//   return (
//     <AuthContext.Provider
//       value={{ userId, role, setUserId, setRole, logOut, apply }}
//     >
//       {!loading ? children : <Loader />}
//     </AuthContext.Provider>
//   );
// }
