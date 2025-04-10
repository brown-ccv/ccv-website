import { Slot } from "@radix-ui/react-slot"
import { type VariantProps, cva } from "class-variance-authority"
import * as React from "react"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        filled_primary:
          "bg-primary-500 text-white shadow hover:bg-primary-300 focus:bg-primary-500 active:bg-primary-700",
        filled_secondary:
          "bg-secondary-500 text-black shadow hover:bg-secondary-300 focus:bg-secondary-500 active:bg-secondary-700",
        outline_primary:
          "bg-transparent border-2 border-primary-500 text-primary-500 hover:bg-transparent hover:border-primary-300 hover:text-primary-300 focus:bg-transparent focus:border-primary-500 focus:text-primary-500 active:bg-primary-50 active:border-primary-700 active:text-primary-700",
        outline_secondary:
          "bg-transparent border-2 border-secondary-500 text-secondary-500 hover:bg-transparent hover:border-secondary-300 hover:text-secondary-300 focus:bg-transparent focus:border-secondary-500 focus:text-secondary-500 active:bg-secondary-50 active:border-secondary-700 active:text-secondary-700",
        outline_neutral:
          "bg-transparent border-2 border-neutral-500 text-neutral-500 hover:bg-transparent hover:border-neutral-300 hover:text-neutral-300 focus:bg-transparent focus:border-neutral-500 focus:text-neutral-500 active:bg-transparent active:border-neutral-500 active:text-neutral-500",
        icon: "-m-3 p-3 focus-visible:outline-offset-[-4px] text-white hover:bg-white/10 rounded-full",
        unstyled: "",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-full px-3 text-xs",
        lg: "h-10 rounded-full px-8",
        icon: "h-9 w-9 p-0",
      },
      iconPosition: {
        left: "flex-row",
        right: "flex-row-reverse",
        none: "",
      },
    },
    defaultVariants: {
      variant: "filled_primary",
      size: "default",
      iconPosition: "none",
    },
  }
)

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

    let actualIconPosition = iconPosition
    if (!actualIconPosition && leftIcon) actualIconPosition = "left"
    if (!actualIconPosition && rightIcon) actualIconPosition = "right"

    const actualSize = iconOnly && !size ? "icon" : size

    return (
      <Comp
        className={cn(
          buttonVariants({
            variant,
            size: actualSize,
            iconPosition: actualIconPosition,
            className,
          })
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

export { Button, buttonVariants }
