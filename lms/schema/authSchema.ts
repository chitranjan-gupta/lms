import { z } from "zod";

// Register Schema
export const registerSchema = z
  .object({
    name: z.string().min(3, "Name is min 3 characters long"),
    username: z
      .string()
      .min(3, "Username is min 3 characters long")
      .refine((data) => !data.includes(" "), {
        message: "Username must not contain a space",
      }),
    email: z.string().email("Invalid email address"),
    password: z.string(),
    // .min(8, { message: 'Password must be at least 8 characters long' })
    // .regex(/[A-Z]/, {
    //   message: 'Password must contain at least one uppercase letter',
    // })
    // .regex(/[a-z]/, {
    //   message: 'Password must contain at least one lowercase letter',
    // })
    // .regex(/[0-9]/, { message: 'Password must contain at least one number' })
    // .regex(/[\W_]/, {
    //   message: 'Password must contain at least one special character',
    // }),
    confirmPassword: z.string(),
    // .min(8, { message: 'Password must be at least 8 characters long' })
    // .regex(/[A-Z]/, {
    //   message: 'Password must contain at least one uppercase letter',
    // })
    // .regex(/[a-z]/, {
    //   message: 'Password must contain at least one lowercase letter',
    // })
    // .regex(/[0-9]/, { message: 'Password must contain at least one number' })
    // .regex(/[\W_]/, {
    //   message: 'Password must contain at least one special character',
    // }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// Login Schema
export const loginSchema = z.object({
  email: z.string().email({
    message: "Email is not valid.",
  }),
  password: z.string(),
  // .min(8, { message: 'Password must be at least 8 characters long' })
  // .regex(/[A-Z]/, {
  //   message: 'Password must contain at least one uppercase letter',
  // })
  // .regex(/[a-z]/, {
  //   message: 'Password must contain at least one lowercase letter',
  // })
  // .regex(/[0-9]/, { message: 'Password must contain at least one number' })
  // .regex(/[\W_]/, {
  //   message: 'Password must contain at least one special character',
  // }),
});
