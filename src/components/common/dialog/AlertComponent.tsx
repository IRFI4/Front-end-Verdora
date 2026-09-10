import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@components/ui/alert-dialog';

type Props = {
  title?: string;
  description?: string;
  isAlertDialogOpen?: boolean;
  errorText?: string;
  onOpenChange: (open: boolean) => void;
  onAction: () => void;
  isDeleting: boolean;
  buttonText?: React.ReactNode;
  actionText?: string;
  loadingText?: string;
};

const AlertComponent = ({
  title = 'Are you absolutely sure?',
  description = 'This action cannot be undone.',
  isAlertDialogOpen,
  errorText,
  onOpenChange,
  onAction,
  isDeleting,
  buttonText,
  actionText,
  loadingText,
}: Props) => {
  return (
    <AlertDialog open={isAlertDialogOpen} onOpenChange={onOpenChange}>
      {buttonText && (
        <AlertDialogTrigger asChild>{buttonText}</AlertDialogTrigger>
      )}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        {errorText && (
          <p className="text-sm text-destructive font-medium" role="alert">
            {errorText}
          </p>
        )}
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={e => {
              e.preventDefault();
              onAction();
            }}
            disabled={isDeleting}
          >
            {isDeleting ? loadingText || 'Deleting...' : actionText || 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertComponent;
