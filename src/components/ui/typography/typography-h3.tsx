import { cn } from "@/lib/utils";
import { type HTMLProps } from "react";

export function TypographyH3({
  className,
  children,
  ...rest
}: HTMLProps<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className,
      )}
      {...rest}
    >
      {children}
    </h3>
  );
}
