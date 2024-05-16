"use client";
import { type Dispatch, type SetStateAction, createContext, useContext, useState } from "react";

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
  return (
    <AuthContext.Provider value={{ userId, setUserId }}>{children}</AuthContext.Provider>
  );
}
