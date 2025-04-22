import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { useStore } from "@/store";
import { observer } from 'mobx-react-lite'

const AlertBox = () => {
  const { setAlertBox, alertBox } = useStore('app')

  return (
    <AlertDialog open={alertBox?.show}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{alertBox?.title}</AlertDialogTitle>
          <AlertDialogDescription>{alertBox?.message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => setAlertBox({ ...alertBox, show: false })}
          >
            Close
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default observer(AlertBox);
