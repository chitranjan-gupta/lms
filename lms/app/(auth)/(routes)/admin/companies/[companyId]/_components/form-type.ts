import { Company } from "@/types";
import { z } from "zod";

// Regex for basic phone number validation
const phoneRegex = /^\+?[1-9]\d{1,14}$/;

export const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  industry: z.string().nullable().optional(),
  sector_type: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  contact_no: z
    .string()
    .regex(phoneRegex, "Invalid phone number")
    .nullable()
    .optional(),
  contact_email: z.string().email("Invalid email").nullable().optional(),
  website_url: z.string().url("Invalid URL").nullable().optional(),
  careers_url: z.string().url("Invalid URL").nullable().optional(),
  logo_url: z.string().url("Invalid URL").nullable().optional(),
  description: z.string().nullable().optional(),
  culture: z.string().nullable().optional(),
});

export type CompanyFormFields = Omit<
  Company,
  "id" | "userId" | "created_at" | "updated_at"
>;

export const form_attrs: Array<keyof CompanyFormFields> = [
  "name",
  "industry",
  "sector_type",
  "location",
  "contact_no",
  "contact_email",
  "website_url",
  "careers_url",
  "logo_url",
  "description",
  "culture",
];
