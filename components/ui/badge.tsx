import React from "react"
import { cn } from "@/lib/utils"
import { badgeVariants } from "@/components/ui/variants"
import type { VariantProps } from "class-variance-authority"
import { getBadgeStyling } from "@/lib/utils"

type BadgeProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof badgeVariants> & {
    // New props for automatic color determination
    value?: string | boolean | number;
    autoColor?: boolean;
  }

/**
 * Enhanced Badge component with automatic color determination
 * 
 * @example
 * // Traditional usage with predefined colors
 * <Badge color="keppel">Success</Badge>
 * 
 * @example
 * // Automatic color based on feature value
 * <Badge value="high" autoColor>High Priority</Badge>
 * <Badge value={true} autoColor>Available</Badge>
 * <Badge value="fast" autoColor>Fast Speed</Badge>
 */
export const Badge = ({ 
  color, 
  className, 
  value, 
  autoColor = false,
  ...props 
}: BadgeProps) => {
  // If autoColor is enabled and a value is provided, use automatic styling
  if (autoColor && value !== undefined) {
    const styling = getBadgeStyling(value);
    return (
      <div 
        className={cn(
          "inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded-full whitespace-nowrap",
          styling.className,
          className
        )} 
        {...props} 
      />
    );
  }

  // Otherwise, use the traditional variant-based approach
  return (
    <div className={cn(badgeVariants({ color }), "whitespace-nowrap", className)} {...props} />
  )
}
