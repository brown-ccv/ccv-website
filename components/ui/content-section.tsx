import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContentSectionProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "alt";
}

export const ContentSection = ({ 
  children, 
  className,
  variant = "default" 
}: ContentSectionProps) => {
  return (
    <section 
      className={cn(
        "content-wrapper py-24 px-14 lg:px-36",
        variant === "alt" && "bg-neutral-50",
        className
      )}
    >
      {children}
    </section>
  );
}; 