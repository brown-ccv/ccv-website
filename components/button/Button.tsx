"use client"

import { Slot } from "@radix-ui/react-slot"
import * as React from "react"
import { cn } from "@/lib/utils"
import { ButtonVariants } from "@/components/button/variants"

import type { VariantProps } from "class-variance-authority"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ButtonVariants> {
  asChild?: boolean
  icon?: React.ReactNode,
  iconAlign?: 'left' | 'right'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      align,
      asChild = false,
      icon,
      iconAlign = 'left',
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"

    const resolvedSize = icon && !size ? "icon" : size

    return (
      <Comp
        className={cn(
          ButtonVariants({
            variant,
            size: resolvedSize,
            align,
            className,
          })
        )}
        ref={ref}
        {...props}
      >
        {icon ? icon : null} 
        {children}
      </Comp>
    )
  }
)

Button.displayName = "Button"

export { Button }
