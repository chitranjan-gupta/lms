"use client";
import { createContext, useContext, useState } from "react";

interface AuthContextProps {
  userId: string;
}

const AuthContext = createContext<AuthContextProps>({
  userId: "ha",
});

export const useAuth = () => useContext(AuthContext);

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userId, setUserId] = useState<string>("");
  return (
    <AuthContext.Provider value={{ userId }}>{children}</AuthContext.Provider>
  );
}
