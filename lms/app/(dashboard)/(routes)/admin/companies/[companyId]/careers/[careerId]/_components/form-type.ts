import { Career } from "@/types";
import { z } from "zod";

// Regex for basic phone number validation
const phoneRegex = /^\+?[1-9]\d{1,14}$/;

export const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  contact_no: z
    .string()
    .regex(phoneRegex, "Invalid phone number")
    .nullable()
    .optional(),
  contact_email: z.string().email("Invalid email").nullable().optional(),
  description: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  salary_range: z.string().nullable().optional(),
  application_deadline: z
    .string()
    .refine(
      (value) => {
        const date = new Date(value);
        return !isNaN(date.getTime()); // Check if it's a valid date
      },
      {
        message: "Invalid datetime format. Please provide a valid datetime.",
      }
    )
    .nullable()
    .optional(),
  career_url: z.string().url("Invalid URL").nullable().optional(),
  work_mode: z.string().nullable().optional(),
  date_posted: z
    .string()
    .refine(
      (value) => {
        const date = new Date(value);
        return !isNaN(date.getTime()); // Check if it's a valid date
      },
      {
        message: "Invalid datetime format. Please provide a valid datetime.",
      }
    )
    .nullable()
    .optional(),
  responsibilities: z.array(z.string()).nullable().optional(),
  benefits: z.array(z.string()).nullable().optional(),
  requirements: z.array(z.string()).nullable().optional(),
  skills: z.array(z.string()).nullable().optional(),
  level: z.string().nullable().optional(),
  experience: z.string().nullable().optional(),
  department: z.string().nullable().optional(),
});

export type CareerFormFields = Omit<
  Career,
  "id" | "companyId" | "created_at" | "updated_at" | "company"
>;

export type CareerFormField = keyof Omit<
  CareerFormFields,
  "responsibilities" | "skills" | "benefits" | "requirements"
>;

export const form_attrs: Array<keyof CareerFormFields> = [
  "title",
  "contact_no",
  "contact_email",
  "description",
  "location",
  "salary_range",
  "application_deadline",
  "career_url",
  "work_mode",
  "date_posted",
  "responsibilities",
  "benefits",
  "requirements",
  "skills",
  "level",
  "experience",
  "department",
];

export const InputType = (value: any) => {
  if (value === "contact_no") {
    return "tel";
  } else if (value === "contact_email") {
    return "email";
  } else if (value === "career_url") {
    return "url";
  } else if (value === "application_deadline" || value === "date_posted") {
    return "datetime-local";
  } else {
    return "text";
  }
};
