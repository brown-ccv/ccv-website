import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "./utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "inline-flex items-center rounded-full bg-yellow-500 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset",
        secondary:
          "inline-flex items-center rounded-full bg-secondary-blue-500 px-2 py-1 text-xs font-medium text-white ring-1 ring-gray-500/10 ring-inset",
        outline: 
        "inline-flex items-center rounded-full border border-input bg-secondary-blue-500 px-2 py-1 text-xs font-medium text-white ring-1 ring-gray-500/10 ring-inset",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
