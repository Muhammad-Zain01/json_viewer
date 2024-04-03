import { useApp } from "../context/app-context";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

const AlertBox = () => {
  const { alertBox, setAlertBox } = useApp();

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

export default AlertBox;
