// components/button.tsx
import { Slot } from "@radix-ui/react-slot"
import * as React from "react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/variants"

import type { VariantProps } from "class-variance-authority"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  iconOnly?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      iconPosition,
      align,
      asChild = false,
      leftIcon,
      rightIcon,
      iconOnly,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"

    let resolvedIconPosition = iconPosition
    if (!resolvedIconPosition && leftIcon) resolvedIconPosition = "left"
    if (!resolvedIconPosition && rightIcon) resolvedIconPosition = "right"

    const resolvedSize = iconOnly && !size ? "icon" : size

    return (
      <Comp
        className={cn(
          buttonVariants({
            variant,
            size: resolvedSize,
            iconPosition: resolvedIconPosition,
            align,
            className
          }),
          "my-4"
        )}
        ref={ref}
        {...props}
      >
        {iconOnly ? (
          <>
            {iconOnly}
            {children && <span className="sr-only">{children}</span>}
          </>
        ) : (
          <>
            {leftIcon}
            {children}
            {rightIcon}
          </>
        )}
      </Comp>
    )
  }
)

Button.displayName = "Button"

export { Button }
