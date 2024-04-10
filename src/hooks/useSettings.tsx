import { JsonParse } from "@/lib/utils";

const useSettings = () => {
  if (typeof window !== "undefined") {
    const getSettings = () => {
      const stringData = localStorage.getItem("json-settings");
      if (stringData) {
        const data = JsonParse(stringData);
        if (data.success) {
          return data.result;
        }
      }
    };
    const setSettings = (setting) => {
      localStorage.setItem("json-settings", JSON.stringify(setting));
    };
    return { getSettings, setSettings };
  }
  return { getSettings: null, setSettings: null };
};

export default useSettings;
