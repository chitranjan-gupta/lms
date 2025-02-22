"use client";

import { useCallback, type FC } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { RegisterForm } from "@/components/register-form";

import { useUser, useAuth } from "@/hooks";
import { registerSchema } from "@/schema";

const Register: FC = () => {
  const router = useRouter();
  const { setUser, error, isloading } = useUser();
  const { oauth } = useAuth();
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

  const onSubmit = useCallback(
    async (values: z.infer<typeof registerSchema>) => {
      const status = await setUser(values);
      if (status) {
        router.push("/login");
      }
    },
    [setUser, router]
  );

  return (
    <div className="w-full flex items-center justify-center px-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
          role="form"
        >
          <RegisterForm
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

export default Register;
