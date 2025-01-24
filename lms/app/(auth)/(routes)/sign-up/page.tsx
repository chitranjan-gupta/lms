"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { registerSchema } from "@/schema";
import { RegisterForm } from "@/components/register-form";
import { useAuth } from "@/core";

export default function Page() {
  const { register, isloading } = useAuth();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof registerSchema>) {
    register(values.name, values.username, values.email, values.password);
  }

  return <RegisterForm form={form} onSubmit={onSubmit} loading={isloading} />;
}
