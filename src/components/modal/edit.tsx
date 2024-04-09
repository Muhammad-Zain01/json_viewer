import { useEffect, useState } from "react";
import { useApp } from "../../context/app-context";
import useData from "../../hooks/useData";
import { GetObject } from "../../lib/utils";
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
import { Textarea } from "../ui/textarea";

const EditModal = () => {
  const { actionModal, setActionModal } = useApp();
  const { type, show, id } = actionModal;
  const [formValue, setFormValue] = useState([]);
  // @ts-ignore
  const { jsonObject } = useData();

  const showModal = type == "edit" && show == true ? true : false;
  useEffect(() => {
    if (showModal) {
      const obj = GetObject(jsonObject, id);
      if (typeof obj?.form == "object") {
        if (Array.isArray(obj?.form)) {
          // todo
        } else {
          const id = obj?.id;
          const FilteredKey = Object.keys(obj.form).find(
            (key, idx) => idx == id
          );
          if (FilteredKey) {
            const CurrentFormValue = obj?.form[FilteredKey];
            if (typeof CurrentFormValue != "object") {
              console.log(CurrentFormValue);
              // @ts-ignore
              setFormValue([{ key: FilteredKey, value: CurrentFormValue }]);
            }
          }
        }
      }
    }
  }, [type, showModal, jsonObject, id]);

  console.log(formValue);
  const onUpdate = () => {
    console.log("onUpdate");
  };

  return (
    <Dialog
      open={showModal}
      onOpenChange={(e) => setActionModal({ type: "edit", id: "", show: e })}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Record</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {formValue.map((item, idx) => {
            return (
              <div key={idx}>
                <div className="">
                  <Label htmlFor="name">key</Label>
                  <Input
                    id="key"
                    // @ts-ignore
                    defaultValue={item?.key ?? idx}
                    // @ts-ignore
                    disabled={item?.key ? false : true}
                    className="mt-1"
                  />
                </div>
                <div className="mt-3">
                  <Label htmlFor="name">value</Label>
                  <Textarea
                    id="value"
                    // @ts-ignore
                    defaultValue={item?.value}
                    className="mt-1 h-[140px]"
                  />
                </div>
              </div>
            );
          })}
        </div>
        <DialogFooter>
          <Button onClick={onUpdate}>Update</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;
