"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "@/schema";
import { LoginForm } from "@/components/login-form";
import { useAuth } from "@/core";

export default function Page() {
  const { login, isloading } = useAuth();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    login(values.email, values.password);
  }

  return <LoginForm form={form} onSubmit={onSubmit} loading={isloading} />;
}
