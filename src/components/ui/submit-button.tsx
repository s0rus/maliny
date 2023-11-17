import { cn } from "@/lib/utils";
import { type VariantProps } from "class-variance-authority";
import { type LucideProps } from "lucide-react";
import { type ButtonHTMLAttributes, type ReactElement } from "react";
import { useFormStatus } from "react-dom";
import { Button, type buttonVariants } from "./button";
import { Icon } from "./icon";

interface SubmitButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  icon: ReactElement;
  loadingIconProps?: LucideProps;
}

export function SubmitButton({
  icon,
  children,
  className,
  loadingIconProps,
  ...rest
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      {...rest}
      type="submit"
      disabled={pending}
      className={cn("inline-flex gap-2", className)}
    >
      {pending ? (
        <Icon.loading
          {...loadingIconProps}
          className={cn("animate-spin", loadingIconProps?.className)}
        />
      ) : (
        icon
      )}
      {children}
    </Button>
  );
}
