"use client";

import { useCallback, type FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { LoginForm } from "@/components/login-form";

import { useAuth } from "@/hooks";
import { loginSchema } from "@/schema";

const Login: FC = () => {
  const { signIn, error, isloading, oauth } = useAuth();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = useCallback(
    async (values: z.infer<typeof loginSchema>) => {
      await signIn(values);
    },
    [signIn]
  );

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
          role="form"
        >
          <LoginForm
            form={form}
            error={error}
            isloading={isloading}
            oauth={oauth}
          />
        </form>
      </Form>
    </div>
  );
}

export default Login;
