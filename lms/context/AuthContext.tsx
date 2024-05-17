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
import { Skeleton } from "@/components/ui/skeleton";

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
        if (error.response.status === 401) {
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
      {!loading ? (
        children
      ) : (
        <div className="w-full h-full flex flex-col justify-center items-center">
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-10 h-10 text-gray-200 animate-spin  fill-sky-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
}
