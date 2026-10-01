import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: React.ElementType;
}

export function Container({ children, className, as: Component = "div" }: ContainerProps) {
  return (
    <Component className={cn("container-page", className)}>
      {children}
    </Component>
  );
}

export function PageContainer({ children, className, as: Component = "main" }: ContainerProps) {
  return (
    <Component id="main" className={cn("flex-1", className)}>
      {children}
    </Component>
  );
}
