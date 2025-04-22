import { Button } from "../ui/button";
import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "../ui/dialog";

import { Input } from "../ui/input";
import { useRef, useEffect } from "react";
import { useToast } from "../ui/use-toast";
import { EnterPress } from "../../lib/utils";
import { useStore } from "@/store";
import { observer } from 'mobx-react-lite';
import { LayoutGrid, FileJson, Plus } from "lucide-react";

const TabModal = () => {
  const { tabModal, setTabModal, tabs, addTab, setCurrentSelectedTab } = useStore('app');
  const inputRef = useRef();
  const { toast } = useToast();

  useEffect(() => {
    if (tabModal?.show && inputRef.current) {
      // @ts-ignore
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [tabModal?.show]);

  const handleCreateTab = () => {
    // @ts-ignore
    const value = inputRef.current.value;
    if (value != "") {
      addTab(value);
      setTabModal(false);

      if (tabs?.length == 1) {
        setCurrentSelectedTab(tabs[0].id);
      }
      toast({
        title: "Tab created successfully",
        description: `New tab "${value}" has been created`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Please enter tab name",
        description: "Tab name cannot be empty",
      });
    }
  };

  return (
    <Dialog open={tabModal?.show} onOpenChange={(e) => setTabModal(e)}>
      <DialogContent className="sm:max-w-md border-gray-200 p-0 overflow-hidden">
        <div className="p-6 pb-0 ">
          <DialogHeader className="mb-2">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mx-auto mb-4">
              <LayoutGrid className="h-6 w-6 text-gray-700" />
            </div>
            <DialogTitle className="text-xl text-gray-800 text-center">Create New Tab</DialogTitle>
            <DialogDescription className="text-gray-600 text-center mt-2">
              Enter a name for your new JSON tab
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            <label htmlFor="tab-name" className="text-sm font-medium text-gray-700 mb-1.5 block">
              Tab Name
            </label>
            <Input
              id="tab-name"
              // @ts-ignore
              ref={inputRef}
              onKeyDown={(e) => EnterPress(e, handleCreateTab)}
              placeholder="Enter tab name..."
              className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
            />
          </div>
        </div>

        <DialogFooter className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="flex w-full gap-3 justify-end">
            <Button
              type="button"
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              onClick={() => setTabModal(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="bg-gray-800 hover:bg-gray-900 text-white"
              onClick={handleCreateTab}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Tab
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default observer(TabModal);
