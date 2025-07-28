import { useAlertController } from "@/stores/useAlertControllerStore";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function AlertController() {
  const alertController = useAlertController();

  const handleAlertAction = () => {
    alertController.alertBtn();
    alertController.setAlert(false);
  };

  const handleConfirmAction = () => {
    alertController.confirmBtn();
    alertController.setConfirm(false);
  };

  const handleConfirmCancel = () => {
    alertController.cancelBtn();
    alertController.setConfirm(false);
  };

  return (
    <>
      {/* Alert Dialog */}
      <AlertDialog
        open={alertController.alert}
        onOpenChange={alertController.setAlert}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{alertController.alertTitle}</AlertDialogTitle>
            <AlertDialogDescription>
              {alertController.alertMsg}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleAlertAction}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Confirm Dialog */}
      <AlertDialog
        open={alertController.confirm}
        onOpenChange={alertController.setConfirm}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{alertController.confirmTitle}</AlertDialogTitle>
            <AlertDialogDescription>
              {alertController.confirmMsg}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleConfirmCancel}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmAction}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
