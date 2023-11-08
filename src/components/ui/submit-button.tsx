import { type PropsWithChildren, type ReactElement } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./button";
import { Icon } from "./icon";

interface SubmitButtonProps extends PropsWithChildren {
  icon: ReactElement;
}

export function SubmitButton({ icon, children }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="inline-flex gap-2">
      {pending ? <Icon.loading className="animate-spin" /> : icon} {children}
    </Button>
  );
}
