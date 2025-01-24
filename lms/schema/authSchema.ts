import { z } from "zod";

// Register Schema
export const registerSchema = z
  .object({
    name: z.string().min(3, "Name is min 3 characters long"),
    username: z.string().min(3, "Username is min 3 characters long").refine((data) => !data.includes(" "), { message: "Username must not contain a space" }),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .max(20, "Password must be no longer than 20 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// Login Schema
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
