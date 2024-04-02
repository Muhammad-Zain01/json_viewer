import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const JsonParse = (jsonString: string) => {
  try {
    let JSON_STRING = jsonString;
    JSON_STRING = JSON_STRING.replace(/\/\/.*|\/\*[\s\S]*?\*\//g, "");
    JSON_STRING = JSON_STRING.replace(/,\s*([\]}])/g, "$1");
    JSON_STRING = JSON_STRING.replace(/\n/g, "").trim();
    JSON_STRING = JSON_STRING.replace(/(\w+)(\s*:\s*)/g, '"$1"$2');

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

export const FormatJsonString = (jsonString: string) => {
  const jsonObj = JsonParse(jsonString);
  if (jsonObj.success) {
    const formattedJSON = JSON.stringify(jsonObj?.result, null, 2);
    return { success: true, json: formattedJSON };
  } else {
    return { success: false, json: "" };
  }
};

export const isJsonValid = (str: string) => {
  const JsonData = JsonParse(str);
  return JsonData.success;
};

export const generateUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
