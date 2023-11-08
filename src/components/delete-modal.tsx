import { DialogClose } from "@radix-ui/react-dialog";
import { type PropsWithChildren } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Icon } from "./ui/icon";
import { SubmitButton } from "./ui/submit-button";

interface DeleteModalProps extends PropsWithChildren {
  entityName: string;
  entityId: string;
  formAction: (
    formData: FormData,
  ) => Promise<
    | { errors: { id?: string[] | undefined }; message: string }
    | { message: string; errors?: undefined }
  >;
  isOpen: boolean;
  setIsModalOpen: () => void;
}

export function DeleteModal({
  children,
  entityName,
  entityId,
  formAction,
  isOpen,
  setIsModalOpen,
}: DeleteModalProps) {
  async function deleteAction(formData: FormData) {
    await formAction(formData);
    setIsModalOpen();
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsModalOpen}>
      {children}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            Are you certain you want to delete &apos;{entityName}&apos;? This
            action cannot be undone.
          </DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="ghost">
                Close
              </Button>
            </DialogClose>
            <form action={deleteAction}>
              <input type="hidden" name="id" value={entityId} />
              <SubmitButton icon={<Icon.checkmark />}>Confirm</SubmitButton>
            </form>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
