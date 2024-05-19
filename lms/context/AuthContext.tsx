"use client";
import axios from "axios";
import {
  type Dispatch,
  type SetStateAction,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { toast } from "sonner";
import Loader from "@/components/loader";

interface AuthContextProps {
  userId: string;
  setUserId?: Dispatch<SetStateAction<string>>;
  logOut: () => Promise<void>;
}

let ready = false;

const AuthContext = createContext<AuthContextProps>({
  userId: "",
  logOut: function (): Promise<void> {
    throw new Error("Function not implemented.");
  },
});

export const useAuth = () => useContext(AuthContext);

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userId, setUserId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  async function getData(refresh: boolean, path: string) {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/${path}`
      );
      if (res.status === 200) {
        console.log(res.data);
        setUserId(res.data.userId);
      } else if (res.status === 401) {
        setUserId("");
      }
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
        if (error.response.status == 401) {
          toast("You are not logined");
          setUserId("");
          if (error.response.data === "Token Expired") {
            if (refresh) {
              await getData(false, "user/refresh");
            }
          }
        }
      }
    } finally {
      setLoading(false);
    }
  }
  async function logOut() {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/user/logout`
      );
      if (res.status === 200) {
        console.log(res.data);
        setUserId("");
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      if (typeof window !== "undefined") {
        void getData(true, "auth");
      }
    } else if (process.env.NODE_ENV === "development") {
      if (ready) {
        if (typeof window !== "undefined") {
          void getData(true, "auth");
        }
      }
      if (ready) {
        ready = false;
      } else {
        ready = true;
      }
    }
  }, []);
  return (
    <AuthContext.Provider value={{ userId, setUserId, logOut }}>
      {!loading ? children : <Loader />}
    </AuthContext.Provider>
  );
}
