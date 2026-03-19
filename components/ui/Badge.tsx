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
        gray: "bg-gray-500 text-white",
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
    "bg-sunglow-400": "text-black",
    "bg-amber-700": "text-white",
    "bg-red-university": "text-white",
    "bg-indigo-800": "text-white",
    "bg-neutral-600": "text-white",
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
    "0": "bg-keppel-500",
    "1": "bg-sunglow-400",
    "2": "bg-amber-700",
    "3": "bg-red-university",
    true: "bg-keppel-500",
    false: "bg-red-university",
    hot: "bg-red-university",
    warm: "bg-sunglow-400",
    cold: "bg-indigo-800",
    fastest: "bg-keppel-900",
    faster: "bg-amber-700",
    fast: "bg-sunglow-400",
    slow: "bg-red-university",
    default: "bg-neutral-600",
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
          "inline-flex items-center whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-semibold",
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
