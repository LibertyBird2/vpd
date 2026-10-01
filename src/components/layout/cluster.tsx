import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ClusterProps {
  children: ReactNode;
  className?: string;
  as?: React.ElementType;
  gap?: "none" | "sm" | "md" | "lg";
  align?: "start" | "center" | "end" | "baseline";
  justify?: "start" | "center" | "end" | "between" | "around";
}

const gapClasses = {
  none: "gap-0",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-8",
};

const alignClasses = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  baseline: "items-baseline",
};

const justifyClasses = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
};

export function Cluster({ 
  children, 
  className, 
  as: Component = "div", 
  gap = "md",
  align = "center",
  justify = "start"
}: ClusterProps) {
  return (
    <Component className={cn(
      "flex flex-wrap", 
      gapClasses[gap], 
      alignClasses[align],
      justifyClasses[justify],
      className
    )}>
      {children}
    </Component>
  );
}
