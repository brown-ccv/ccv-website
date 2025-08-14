import React from "react"
import { cn } from "@/lib/utils"
import { getBadgeStyling } from "@/components/storage/utils"
import { cva, VariantProps } from "class-variance-authority"

// The badge system:
// - Automatically determines appropriate colors based on feature values
// - Provides consistent styling across the application
// - Supports both traditional and automatic color modes
// - Includes utility functions for color management

// ## Best Practices

// 1. **Use `autoColor` for feature values** - This ensures consistent color mapping across the application
// 2. **Use predefined colors for UI elements** - Use `color` prop for buttons, status indicators, etc.
// 3. **Combine with custom styling** - Add custom classes for specific design requirements
// 4. **Test accessibility** - The system automatically handles text contrast, but verify in your specific use case

// ## Color Mapping Logic

// The automatic color system maps values to colors based on semantic meaning:

// - **High/True/Positive** → Green (keppel)
// - **Medium/Partial** → Yellow (sunglow/amber)
// - **Low/False/Negative** → Red (red-university)
// - **Storage temperatures** → Red (hot), Yellow (warm), Cyan (cold)
// - **Speed levels** → Green (fastest), Amber (faster), Yellow (fast), Red (slow)
// - **Storage sizes** → Based on capacity (small → cyan, large → yellow, unlimited → green)

/**
 * Badge component with automatic color determination
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

export const BadgeVariants = cva(
  "inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded-full whitespace-nowrap",
  {
    variants: {
      color: {
        // Shared colors
        keppel: "bg-keppel-500 text-black",
        sunglow: "bg-sunglow-400 text-black",
        purple: "bg-purple-900 text-white",
        blue: "bg-blue-500 text-white",
        red: "bg-red-university text-white",
        pink: "bg-pink-500 text-white",
      },
    },
    defaultVariants: {
      color: "keppel",
    },
  }
)

type BadgeProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof BadgeVariants> & {
    // New props for automatic color determination
    value?: string | boolean | number
    autoColor?: boolean
  }

export const Badge = ({
  color,
  className,
  value,
  autoColor = false,
  ...props
}: BadgeProps) => {
  // If autoColor is enabled and a value is provided, use automatic styling
  if (autoColor && value !== undefined) {
    const styling = getBadgeStyling(value)
    return (
      <div
        className={cn(
          "inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded-full whitespace-nowrap",
          styling.className,
          className
        )}
        {...props}
      />
    )
  }

  // Otherwise, use the traditional variant-based approach
  return (
    <div
      className={cn(BadgeVariants({ color }), "whitespace-nowrap", className)}
      {...props}
    />
  )
}
