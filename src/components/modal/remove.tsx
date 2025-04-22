import { useStore } from "@/store";
import { useApp } from "../../context/app-context";
import useData from "../../hooks/useData";
import { RemoveObject } from "../../lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { observer } from 'mobx-react-lite'

const RemoveModal = () => {
  const { setActionModal, actionModal, setJsonObject } = useStore('app');
  // @ts-ignore
  const { jsonObject } = useData();
  const { type, show, id } = actionModal;

  const onRemove = () => {
    setJsonObject(RemoveObject(jsonObject, id));
    setActionModal({ ...actionModal, show: false });
  };
  return (
    <AlertDialog open={type == "delete" && show == true ? true : false}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure to remove this.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              setActionModal({
                type: "",
                show: false,
                id: "",
              });
            }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={onRemove}>Remove</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default observer(RemoveModal);
