import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// @ts-ignore
const ParsingAlgo = (...args) => {
  for (let i = 0; i < args.length; i++) {
    try {
      JSON.parse(args[i]);
      return args[i];
    } catch (e) {
      continue;
    }
  }
  return args[0];
};

export const JsonParse = (jsonString: string) => {
  try {
    const pre_compiled = jsonString.replace(/\n/g, "").trim();
    const JSON_DATA = ParsingAlgo(
      pre_compiled,
      pre_compiled.replace(/,\s*([\]}])/g, "$1"),
      pre_compiled.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":'),
      pre_compiled.replace(/\/\/.*|\/\*[\s\S]*?\*\//g, ""),
      pre_compiled.replace(/({|,)\s*([a-zA-Z0-9_]+?)\s*:/g, '$1 "$2":')
    );

    return {
      success: true,
      result: JSON.parse(JSON_DATA),
      error: null,
    };
  } catch (error) {
    console.log(error);
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
    const formattedJSON = JSON.stringify(jsonObj?.result, null, 4);
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

export const EnterPress = (e, cb) => {
  if (e.which == 13) {
    cb();
  }
};

export const RemoveObject = (object: any, ind: string) => {
  const levels = ind.split(".");
  let newObject: any = { ...object };
  let selectedObject: any = newObject;

  for (let i = 0; i < levels.length; i++) {
    const vl = Number(levels[i]);
    const isLast = levels.length - 1 == i ? true : false;

    if (isLast) {
      if (typeof selectedObject == "object") {
        if (Array.isArray(selectedObject)) {
          selectedObject.splice(vl, 1);
          return newObject;
        } else {
          const valueObject = Object.keys(selectedObject).filter((key, idx) => {
            if (idx == vl) {
              return true;
            }
            return false;
          });
          if (valueObject.length) {
            delete selectedObject[valueObject[0]];
            return newObject;
          }
        }
      }
    } else {
      if (typeof selectedObject == "object") {
        if (Array.isArray(selectedObject)) {
          selectedObject = selectedObject[vl];
        } else {
          const valueObject = Object.keys(selectedObject).filter((_, idx) => {
            if (idx == vl) {
              return true;
            }
            return false;
          });
          selectedObject = selectedObject[valueObject[0]];
        }
      }
    }
  }
};

export const GetObject = (object: any, ind: string) => {
  const levels = ind.split(".");
  let newObject: any = { ...object };
  let selectedObject: any = newObject;

  for (let i = 0; i < levels.length; i++) {
    const vl = Number(levels[i]);
    const isLast = levels.length - 1 == i ? true : false;

    if (isLast) {
      if (typeof selectedObject == "object") {
        return { form: selectedObject, id: vl };
      }
    } else {
      if (typeof selectedObject == "object") {
        if (Array.isArray(selectedObject)) {
          selectedObject = selectedObject[vl];
        } else {
          const valueObject = Object.keys(selectedObject).filter((_, idx) => {
            if (idx == vl) {
              return true;
            }
            return false;
          });
          selectedObject = selectedObject[valueObject[0]];
        }
      }
    }
  }
};
