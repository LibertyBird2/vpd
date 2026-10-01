import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StackProps {
  children: ReactNode;
  className?: string;
  as?: React.ElementType;
  gap?: "none" | "sm" | "md" | "lg" | "xl";
}

const gapClasses = {
  none: "gap-0",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-8",
  xl: "gap-14",
};

export function Stack({ children, className, as: Component = "div", gap = "md" }: StackProps) {
  return (
    <Component className={cn("flex flex-col", gapClasses[gap], className)}>
      {children}
    </Component>
  );
}
