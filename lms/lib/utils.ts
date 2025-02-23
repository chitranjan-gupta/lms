import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const camelCase = (t: string) => {
  return t.replace(t[0],t.charAt(0).toUpperCase())
}

export const normalize = (t: string) => {
  return camelCase(t).replaceAll('-', ' ');
}