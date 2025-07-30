import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContentSectionProps {
  children: ReactNode;
  className?: string;
}

export const ContentSection = ({ 
  children, 
  className
}: ContentSectionProps) => {
  return (
    <section 
      className={cn(
        "content-wrapper py-24 px-6 sm:px-8 lg:px-24",
        className
      )}
    >
      {children}
    </section>
  );
}; 