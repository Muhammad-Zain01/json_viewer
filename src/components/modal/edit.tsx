import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const EditModal = () => {
  const onUpdate = () => {
    console.log("onUpdate");
  };
  return (
    <Dialog>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Record</DialogTitle>
        </DialogHeader>
        <div className="tw-grid tw-gap-4 tw-py-4">
          <div className="">
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue="Pedro Duarte" className="tw-mt-1" />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onUpdate}>Update</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;
