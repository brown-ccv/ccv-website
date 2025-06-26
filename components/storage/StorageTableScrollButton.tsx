import React from 'react';
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/variants";
import type { VariantProps } from "class-variance-authority";

export interface TableScrollButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  onClick: () => void;
}

export const TableScrollButton: React.FC<TableScrollButtonProps> = ({ children, onClick, ...props }) => {
  return (
    <Button
      onClick={onClick}
      {...props}
    >
      {children}
    </Button>
  );
};