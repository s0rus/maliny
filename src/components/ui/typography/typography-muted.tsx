import { cn } from "@/lib/utils";
import { type HTMLProps } from "react";

export function TypographyMuted({
  className,
  children,
  ...rest
}: HTMLProps<HTMLHeadingElement>) {
  return (
    <h3 className={cn("text-sm text-muted-foreground", className)} {...rest}>
      {children}
    </h3>
  );
}
