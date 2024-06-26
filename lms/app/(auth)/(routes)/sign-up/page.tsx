"use client";
import Image from "next/image";
import logo from "@/public/logo.svg";
import { type FormEvent, useState } from "react";
import { Eye } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();
  async function onSubmit(event: FormEvent) {
    setError("");
    event.preventDefault();
    const formData = new FormData(
      document.getElementById("form") as HTMLFormElement
    );
    if (
      formData.get("password")?.toString() !==
      formData.get("confirm-password")?.toString()
    ) {
      console.log("Password and confirm password is not same.");
      setError("Password and confirm password is not same.");
      return;
    }
    const jsonData = {
      name: formData.get("name"),
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmation_password: formData.get("confirm-password"),
    };
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/user/signup`,
        JSON.stringify(jsonData)
      );
      if (res.status === 200) {
        router.push("/sign-in");
      } else {
        setError(res.data);
      }
    } catch (error: any) {
      console.log(error);
      setError(error.message);
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
        className="flex items-center mb-2 text-2xl font-semibold text-gray-900 dark:text-white"
      >
        <div className="relative w-20 h-20 mr-2">
          <Image fill src={logo} alt="logo" />
        </div>
      </a>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Create an account
          </h1>
          <form
            id="form"
            className="space-y-4 md:space-y-6"
            onSubmit={onSubmit}
          >
            <div className="flex flex-row gap-x-2">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Your name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5 "
                  placeholder="John Snow"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Your username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5"
                  placeholder="name"
                  required
                />
              </div>
            </div>

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
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5"
                placeholder="name@company.com"
                required
              />
            </div>
            <div className="flex flex-row gap-x-2">
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
                    placeholder="••••••••"
                    className="z-10 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5 "
                    required
                  />
                  <Eye
                    className="w-5 h-5 -ml-8 z-20 bg-gray-50"
                    onClick={() => show("password")}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Confirm password
                </label>
                <div className="flex flex-row items-center">
                  <input
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5 "
                    required
                  />
                  <Eye
                    className="w-5 h-5 -ml-8 z-20 bg-gray-50"
                    onClick={() => show("confirm-password")}
                  />
                </div>
              </div>
            </div>
            {error && (
              <div>
                <span className="text-red-500">{error}</span>
              </div>
            )}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  aria-describedby="terms"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-sky-300 "
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-light text-gray-500 ">
                  I accept the{" "}
                  <a
                    className="font-medium text-sky-600 hover:underline "
                    href="#"
                  >
                    Terms and Conditions
                  </a>
                </label>
              </div>
            </div>
            <button
              disabled={loading}
              type="submit"
              className="w-full text-white bg-sky-600 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Create an account
            </button>
            <p className="text-sm font-light text-gray-500">
              Already have an account?{" "}
              <a
                href="/sign-in"
                className="font-medium text-sky-600 hover:underline"
              >
                Signin here
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
