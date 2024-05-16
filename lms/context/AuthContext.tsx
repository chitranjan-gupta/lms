"use client";
import axios from "axios";
import { type Dispatch, type SetStateAction, createContext, useContext, useState, useEffect } from "react";

interface AuthContextProps {
  userId: string;
  setUserId?: Dispatch<SetStateAction<string>>
}

const AuthContext = createContext<AuthContextProps>({
  userId: "",
});

export const useAuth = () => useContext(AuthContext);

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userId, setUserId] = useState<string>("");
  async function getData(){
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth`);
      if(res.status === 200){
        console.log(res.data);
        setUserId(res.data.userId);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    void getData();
  },[])
  return (
    <AuthContext.Provider value={{ userId, setUserId }}>{children}</AuthContext.Provider>
  );
}
