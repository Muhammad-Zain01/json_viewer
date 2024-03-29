import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const JsonParse = (jsonString: string) => {
  try {
    let JSON_STRING = jsonString.replace(/\/\/.*|\/\*[\s\S]*?\*\//g, "");
    JSON_STRING = JSON_STRING.replace(/,\s*([\]}])/g, "$1");
    JSON_STRING = JSON_STRING.replace(/\n/g, "").trim();

    return {
      success: true,
      result: JSON.parse(JSON_STRING),
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      result: null,
      error: true,
    };
  }
};


export const isJsonValid = (str: string) => {
  const JsonData = JsonParse(str);
  return JsonData.success;
};
