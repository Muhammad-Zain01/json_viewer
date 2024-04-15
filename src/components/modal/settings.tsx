"use client";
import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import { Settings } from "lucide-react";
import { Switch } from "../ui/switch";
import useSettings from "@/hooks/useSettings";
import { useEffect, useState } from "react";

const SettingModal = () => {
  const { getSettings, setSettings } = useSettings();
  let setting = null;
  const [saveToLocalStorage, setSaveToLocalStorage] = useState<boolean>(true);

  useEffect(() => {
    if (getSettings) {
      setting = getSettings();
      if (setting) {
        setSaveToLocalStorage(setting?.saveToLocalStorage);
      }
    }
  }, []);

  const handleChange = (e: boolean) => {
    if (setSettings) {
      setSettings({ saveToLocalStorage: e });
      if (!e) {
        if (typeof window !== "undefined") {
          localStorage && localStorage.removeItem("tabs-data");
        }
      }
    }
  };
  return (
    <Dialog>
      <DialogTrigger>
        <Settings className="mr-4" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <main className="flex items-center justify-start mt-2">
          <label htmlFor="save">Save JSON to Local Storage : </label>
          <Switch
            onCheckedChange={handleChange}
            defaultChecked={saveToLocalStorage}
            id="save"
            className="ml-2"
          />
        </main>
      </DialogContent>
    </Dialog>
  );
};

export default SettingModal;
