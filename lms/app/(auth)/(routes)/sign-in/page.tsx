"use client";

import React, { type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { Eye } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import logo from "@/public/logo.svg";

export default function Page() {
  const { setUserId, setRole } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  async function onSubmit(event: FormEvent) {
    setError("");
    event.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/signin`,
        JSON.stringify({
          email: email,
          password: password,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.status == 200) {
        if (res.data.userId && res.data.role) {
          if (setUserId && setRole) {
            setUserId(res.data.userId);
            setRole(res.data.role);
            if (res.data.role == "admin") {
              router.push("/admin/courses");
            } else {
              router.push("/dashboard");
            }
          }
        }
      } else {
        setError(res.data);
      }
    } catch (error: any) {
      if (error.response) {
        if (error.response.data) {
          if (error.response.data.message) {
            setError(error.response.data.message);
          } else {
            setError(error.response.statusText);
          }
        } else {
          setError(error.response.statusText);
        }
        console.log(error.response);
      }
    } finally {
      setLoading(false);
    }
  }
  function show(id: string) {
    const element = document.getElementById(id) as HTMLInputElement;
    if (element.type === "password") {
      element.type = "text";
    } else {
      element.type = "password";
    }
  }
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a
        href="/"
        className="flex items-center mb-6 text-2xl font-semibold text-gray-900 "
      >
        <div className="relative w-20 h-20 mr-2">
          <Image fill src={logo} alt="logo" />
        </div>
      </a>
      <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
            Sign in to your account
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5 "
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Password
              </label>
              <div className="flex flex-row items-center">
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="z-10 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5 "
                  required
                />
                <Eye
                  className="h-5 w-5 z-20 bg-gray-50 -ml-8"
                  onClick={() => show("password")}
                />
              </div>
            </div>
            {error && <div className="text-red-500">{error}</div>}
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-sky-300 "
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="remember" className="text-gray-500 ">
                    Remember me
                  </label>
                </div>
              </div>
              <a
                href="#"
                className="text-sm font-medium text-sky-600 hover:underline "
              >
                Forgot password?
              </a>
            </div>
            <button
              disabled={loading}
              type="submit"
              className="w-full text-white bg-sky-600 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              Sign in
            </button>
            <p className="text-sm font-light text-gray-500 ">
              Don’t have an account yet?{" "}
              <a
                href="/sign-up"
                className="font-medium text-sky-600 hover:underline "
              >
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
