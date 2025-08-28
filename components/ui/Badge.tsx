import React from "react"
import { cn } from "@/lib/utils"
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
  "inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full whitespace-nowrap",
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

/**
 * Determines whether text should be white or black based on the background color
 * Uses WCAG contrast guidelines for accessibility
 *
 * @param {string} backgroundColor - The background color (CSS class or hex)
 * @returns {string} - 'text-white' or 'text-black'
 */
export const getTextColorForBackground = (backgroundColor: string): string => {
  const colorMap: Record<string, string> = {
    "bg-keppel-500": "text-black",
    "bg-keppel-600": "text-white",
    "bg-keppel-700": "text-white",
    "bg-sunglow-400": "text-black",
    "bg-sunglow-200": "text-black",
    "bg-red-university": "text-white",
    "bg-red-500": "text-white",
    "bg-red-600": "text-white",
    "bg-amber-600": "text-white",
    "bg-amber-500": "text-white",
    "bg-cyan-500": "text-white",
    "bg-purple-900": "text-white",
    "bg-purple-500": "text-white",
    "bg-blue-500": "text-white",
    "bg-blue-600": "text-white",
    "bg-pink-500": "text-white",
    "bg-neutral-800": "text-white",
    "bg-neutral-900": "text-white",
    "bg-neutral-200": "text-black",
    "bg-neutral-300": "text-black",
    "bg-neutral-400": "text-white",
    "bg-neutral-500": "text-white",
    "bg-neutral-600": "text-white",
    "bg-neutral-700": "text-white",
  }
  return colorMap[backgroundColor] || "text-black"
}

/**
 * Maps feature values to badge background colors based on the storage-types color map
 */
export const getBadgeBackgroundColor = (
  value: string | boolean | number
): string => {
  const stringValue = String(value).toLowerCase()
  const backgroundMap: Record<string, string> = {
    high: "bg-red-university",
    medium: "bg-amber-600",
    low: "bg-keppel-600",
    "0": "bg-keppel-600",
    "1": "bg-sunglow-400",
    "2": "bg-amber-600",
    "3": "bg-red-university",
    true: "bg-keppel-600",
    false: "bg-red-university",
    easy: "bg-keppel-600",
    complex: "bg-red-university",
    partial: "bg-sunglow-400",
    "low cost": "bg-keppel-600",
    "medium cost": "bg-sunglow-400",
    "high cost": "bg-red-university",
    hot: "bg-red-university",
    warm: "bg-sunglow-400",
    cold: "bg-cyan-500",
    fastest: "bg-keppel-600",
    faster: "bg-amber-600",
    fast: "bg-sunglow-400",
    slow: "bg-red-university",
    small: "bg-cyan-500",
    large: "bg-sunglow-400",
    "4 gb": "bg-red-university",
    "1 tb": "bg-amber-600",
    "1 tb +": "bg-sunglow-400",
    "2 tb +": "bg-sunglow-400",
    "4 tb": "bg-sunglow-400",
    "128 tb": "bg-sunglow-400",
    "8 eb": "bg-keppel-600",
    "9 eb": "bg-keppel-600",
    unlimited: "bg-keppel-600",
    default: "bg-neutral-200",
  }
  return backgroundMap[stringValue] || backgroundMap["default"]
}

/**
 * Gets the complete badge styling for a feature value
 */
export const getBadgeStyling = (value: string | boolean | number) => {
  const backgroundColor = getBadgeBackgroundColor(value)
  const textColor = getTextColorForBackground(backgroundColor)
  return {
    backgroundColor,
    textColor,
    className: `${backgroundColor} ${textColor}`,
  }
}

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
          "inline-flex items-center whitespace-nowrap rounded-full px-2 py-1 text-xs font-semibold",
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
