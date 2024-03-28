import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isJsonValid = (str: string) => {
  try {
    JSON.parse(str);
    return true; // Parsing succeeded, the string is valid JSON
  } catch (e) {
    return false; // Parsing failed, the string is not valid JSON
  }
};
