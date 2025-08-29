import React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { cn } from "@/lib/utils"

interface RadioGroupProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {}
interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {}

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("gap-2", className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        // Base styles for the outer circle
        "aspect-square h-6 w-6 rounded-full",
        "border border-neutral-700 bg-white",

        // Focus state (for accessibility)
        "ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-keppel-600",
        "disabled:cursor-not-allowed disabled:opacity-50", // Disabled state

        // Hover state
        "hover:border-keppel-500 hover:ring-2 hover:ring-keppel-600 hover:ring-offset-2",

        // Active state
        "active:border-keppel-600 active:ring-2 active:ring-keppel-600 active:ring-offset-2",

        // Selected state (data-[state=checked])
        "data-[state=checked]:border-neutral-700",

        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        {/* Inner circle fill for selected state */}
        <div
          className={cn(
            "aspect-square h-4 w-4 rounded-full",
            "border border-keppel-600 bg-keppel-600",
            "data-[state=checked]:bg-keppel-600",
            "data-[state=checked]:text-keppel-600" // Fallback for text-based indicators if any
          )}
        />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
