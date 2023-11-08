import { cn } from "@/lib/utils";
import { type HTMLProps } from "react";

export function TypographyH4({
  className,
  children,
  ...rest
}: HTMLProps<HTMLHeadingElement>) {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className,
      )}
      {...rest}
    >
      {children}
    </h4>
  );
}
