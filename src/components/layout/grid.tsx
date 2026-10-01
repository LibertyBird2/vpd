import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GridProps {
  children: ReactNode;
  className?: string;
  as?: React.ElementType;
  gap?: "sm" | "md" | "lg" | "xl";
  cols?: 1 | 2 | 3 | 4;
}

const gapClasses = {
  sm: "gap-4",
  md: "gap-8",
  lg: "gap-12",
  xl: "gap-16",
};

const colClasses = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

export function Grid({ 
  children, 
  className, 
  as: Component = "div", 
  gap = "md",
  cols = 1
}: GridProps) {
  return (
    <Component className={cn(
      "grid", 
      gapClasses[gap],
      colClasses[cols],
      className
    )}>
      {children}
    </Component>
  );
}
