import { type ClassValue, clsx } from "clsx";
import { ConstructionIcon } from "lucide-react";
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

// @ts-ignore
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

export const SetValue = (object: any, ind: string, value: any) => {
  const levels = ind.split(".");
  let newObject: any = { ...object };
  let selectedObject: any = newObject;

  for (let i = 0; i < levels.length; i++) {
    const vl = Number(levels[i]);
    const isLast = levels.length - 1 == i ? true : false;

    if (isLast) {
      if (typeof selectedObject == "object") {
        if (Array.isArray(selectedObject)) {
          selectedObject[vl] = value;
          return newObject;
        } else {
          const valueObject = Object.keys(selectedObject).filter((key, idx) => {
            if (idx == vl) {
              return true;
            }
            return false;
          });
          if (valueObject.length) {
            selectedObject[valueObject[0]] = value;
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

function replaceKey(obj: any, oldKey: string, newKey: string) {
  if (obj.hasOwnProperty(oldKey)) {
    obj[newKey] = obj[oldKey]; // Create new key with the value of old key
    delete obj[oldKey]; // Delete the old key
    return obj;
  }
}

function detectStringType(input: string) {
  const colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  if (colorRegex.test(input)) {
    return "color";
  }
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (dateRegex.test(input)) {
    return "date";
  }

  const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{6}$/;
  if (isoDateRegex.test(input)) {
    return "datetime";
  }

  return "string";
}
export const getValueType = (value: any) => {
  if (value === null) return "null";
  if (value === undefined) return "undefined";
  if (value === false) return "boolean";
  if (value === true) return "boolean";
  if (Array.isArray(value)) return "array";
  if (typeof value == "object") return "object";
  if (typeof value == "string") return detectStringType(value);
  return typeof value;
};

export const formatToPHP: any = (value: any, indentLevel = 0) => {
  const indent = " ".repeat(indentLevel * 4);
  const subIndent = " ".repeat((indentLevel + 1) * 4);

  if (typeof value === "string") {
    return `'${value.replace(/'/g, "\\'")}'`;
  } else if (Array.isArray(value)) {
    if (value.length === 0) {
      return "[]";
    }
    const arrayContents: any = value
      .map((item) => `${subIndent}${formatToPHP(item, indentLevel + 1)}`)
      .join(",\n");
    return `[\n${arrayContents}\n${indent}]`;
  } else if (typeof value === "object" && value !== null) {
    const properties: any = Object.entries(value)
      .map(([key, val]) => {
        return `${subIndent}'${key}' => ${formatToPHP(val, indentLevel + 1)}`;
      })
      .join(",\n");
    return `[\n${properties}\n${indent}]`;
  } else if (typeof value === "number" || typeof value === "boolean") {
    return value.toString();
  } else {
    return "null";
  }
};

export const formatToJavaScript: any = (
  value: any,
  indentLevel: number = 0
) => {
  const indent = " ".repeat(indentLevel * 2);
  const subIndent = " ".repeat((indentLevel + 1) * 2);
  if (typeof value === "string") {
    return `'${value}'`;
  } else if (Array.isArray(value)) {
    if (value.length === 0) {
      return "[]";
    }
    const arrayContents = value
      .map((item) => `${subIndent}${formatToJavaScript(item, indentLevel + 1)}`)
      .join(",\n");
    return `[\n${arrayContents}\n${indent}]`;
  } else if (typeof value === "object" && value !== null) {
    const properties = Object.entries(value)
      .map(([key, val]) => {
        return `${subIndent}${key}: ${formatToJavaScript(
          val,
          indentLevel + 1
        )}`;
      })
      .join(",\n");
    return `{\n${properties}\n${indent}}`;
  } else {
    return value.toString();
  }
};

export const formatPython = (value: any) => {
  return JSON.stringify(value, null, 2)
    .replace(/null/g, "None")
    .replace(/true/g, "True")
    .replace(/false/g, "False");
};

export const formatToJava = (object: any) => {
  const javaValue: any = (value: any) => {
    if (typeof value === "string") {
      return `"${value.replace(/"/g, '\\"')}"`;
    } else if (typeof value === "number") {
      return value;
    } else if (typeof value === "boolean") {
      return value;
    } else if (Array.isArray(value)) {
      const arrayElements = value.map((v) => javaValue(v)).join(", ");
      return `Arrays.asList(${arrayElements})`;
    } else if (typeof value === "object" && value !== null) {
      return formatToJava(value);
    } else {
      return "null";
    }
  };

  let result = "Map<String, Object> map = new HashMap<>();\n";
  for (const [key, value] of Object.entries(object)) {
    result += `map.put("${key}", ${javaValue(value)});\n`;
  }
  return result;
};

export const formatToRust = (object: any) => {
  const rustValue: any = (value: any) => {
    if (typeof value === "string") {
      return `String::from("${value.replace(/"/g, '\\"')}")`;
    } else if (typeof value === "number" || typeof value === "boolean") {
      return value.toString();
    } else if (Array.isArray(value)) {
      const arrayContents = value.map((v) => rustValue(v)).join(", ");
      return `vec![${arrayContents}]`;
    } else if (typeof value === "object" && value !== null) {
      return formatToRust(value);
    } else {
      return "serde_json::json!(null)";
    }
  };

  let result =
    "use std::collections::HashMap;\nuse serde_json::Value;\n\nlet mut map: HashMap<String, Value> = HashMap::new();\n";
  for (const [key, value] of Object.entries(object)) {
    result += `map.insert(String::from("${key}"), ${rustValue(value)});\n`;
  }
  return result;
};

export const formatToRuby = (object: string) => {
  const rubyValue: any = (value: any) => {
    if (typeof value === "string") {
      return `'${value.replace(/'/g, "\\'")}'`;
    } else if (typeof value === "number" || typeof value === "boolean") {
      return value.toString();
    } else if (Array.isArray(value)) {
      const arrayContents = value.map((v) => rubyValue(v)).join(", ");
      return `[${arrayContents}]`;
    } else if (typeof value === "object" && value !== null) {
      return formatToRuby(value);
    } else {
      return "nil";
    }
  };

  let result = "{\n";
  for (const [key, value] of Object.entries(object)) {
    result += `  :${key} => ${rubyValue(value)},\n`;
  }
  result += "}";
  return result;
};

export const formatToGo = (object: string) => {
  const goValue: any = (value: any) => {
    if (typeof value === "string") {
      return `"${value.replace(/"/g, '\\"')}"`;
    } else if (typeof value === "number" || typeof value === "boolean") {
      return value.toString();
    } else if (Array.isArray(value)) {
      const arrayContents = value.map((v) => goValue(v)).join(", ");
      return `[]interface{}{${arrayContents}}`;
    } else if (typeof value === "object" && value !== null) {
      return formatToGo(value);
    } else {
      return "nil";
    }
  };

  let result = "map[string]interface{} {\n";
  for (const [key, value] of Object.entries(object)) {
    result += `  "${key}": ${goValue(value)},\n`;
  }
  result += "}";
  return result;
};
