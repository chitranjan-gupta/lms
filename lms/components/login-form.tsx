import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Spinner } from "./spinner";

export function LoginForm({
  form,
  onSubmit,
  loading,
}: {
  form: any;
  onSubmit: any;
  loading: boolean;
}) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your details below to login in your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="name@company.com"
                          autoComplete="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <div className="flex flex-row">
                          <div>Password</div>
                          <Link
                            href="#"
                            className="ml-auto inline-block text-sm underline !text-black dark:!text-white"
                          >
                            Forgot your password?
                          </Link>
                        </div>
                      </FormLabel>
                      <FormControl>
                        <div className="flex flex-row">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            autoComplete="current-password"
                            {...field}
                          />
                          <Button
                            className="z-20 -ml-10"
                            onClick={() => setShowPassword(!showPassword)}
                            type="button"
                          >
                            {showPassword ? (
                              <Eye className="h-5 w-5 text-white" />
                            ) : (
                              <EyeOff className="h-5 w-5 text-white" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="rememberme" />
                <Label
                  htmlFor="rememberme"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember Me
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <Label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I accept the{" "}
                  <Link
                    className="font-medium text-sky-600 hover:underline "
                    href="#"
                  >
                    Terms and Conditions
                  </Link>
                </Label>
              </div>
              <Button disabled={loading} type="submit" className="w-full flex flex-row gap-x-2">
                {loading && <Spinner />}
                Login
              </Button>
              <Button disabled={loading} variant="outline" className="w-full">
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="underline text-sky-600">
                Register
              </Link>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
