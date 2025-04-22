"use client";
import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";

import { Settings, Save, Database, Info } from "lucide-react";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import useSettings from "@/hooks/useSettings";
import { useEffect, useState } from "react";

const SettingModal = () => {
  const { getSettings, setSettings } = useSettings();
  let setting = null;
  const [saveToLocalStorage, setSaveToLocalStorage] = useState<boolean>(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (getSettings) {
      setting = getSettings();
      if (setting) {
        setSaveToLocalStorage(setting?.saveToLocalStorage);
      }
    }
  }, []);

  const handleChange = (e: boolean) => {
    setSaveToLocalStorage(e);
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button 
          className="p-2 rounded-md hover:bg-gray-100 transition-colors flex items-center justify-center"
          title="Settings"
        >
          <Settings className="h-5 w-5 text-gray-600" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md border-gray-200 p-0 overflow-hidden">
        <div className="bg-gradient-to-r from-gray-50 to-white p-6 border-b border-gray-200">
          <DialogHeader className="mb-2">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mx-auto mb-4">
              <Settings className="h-6 w-6 text-gray-700" />
            </div>
            <DialogTitle className="text-xl text-gray-800 text-center">Settings</DialogTitle>
            <DialogDescription className="text-gray-600 text-center mt-2">
              Configure your JSON Viewer preferences
            </DialogDescription>
          </DialogHeader>
        </div>
        
        <div className="p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <Save className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-800">Save to Local Storage</h3>
                  <p className="text-xs text-gray-600 mt-1">
                    Store your JSON data and tabs in browser storage for future sessions
                  </p>
                </div>
              </div>
              <Switch
                checked={saveToLocalStorage}
                onCheckedChange={handleChange}
                id="save"
                className="data-[state=checked]:bg-gray-700"
              />
            </div>
            
            <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div className="mt-0.5">
                <Info className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-blue-700">
                  When local storage is enabled, your JSON data and tabs will be saved in your browser. 
                  Disabling this will clear all saved data.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter className="p-4 bg-gray-50 border-t border-gray-200">
          <Button 
            type="button" 
            className="bg-gray-800 hover:bg-gray-900 text-white"
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SettingModal;
