import { Button } from "../ui/button";
import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";

import { Input } from "../ui/input";
import { useRef } from "react";
import { useToast } from "../ui/use-toast";
import { useApp } from "../../context/app-context";

const TabModal = () => {
  const { tabModal, setTabModal, setAddTab } = useApp();
  const inputRef = useRef();
  const { toast } = useToast();

  const handleCreateTab = () => {
    const value = inputRef.current.value;
    if (value != "") {
      setAddTab(value);
      setTabModal(false);
    } else {
      toast({
        variant: "destructive",
        title: "Please enter tab name",
      });
    }
  };

  return (
    <Dialog open={tabModal?.show} onOpenChange={(e) => setTabModal(e)}>
      <DialogContent className="sm:tw-max-w-md">
        <DialogHeader>
          <DialogTitle>Create new tab</DialogTitle>
        </DialogHeader>
        <Input ref={inputRef} placeholder="New Tab..." />

        <DialogFooter className="sm:tw-justify-start">
          <Button type="button" onClick={handleCreateTab}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TabModal;
