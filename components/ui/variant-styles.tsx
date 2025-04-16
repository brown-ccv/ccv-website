// components/variantStyles.ts
import { cva } from "class-variance-authority"

export const variantStyles = cva(
  "rounded-full text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        filled_primary: "bg-primary-500 text-white shadow hover:bg-primary-300 focus:bg-primary-500 active:bg-primary-700",
        filled_secondary: "bg-secondary-500 text-black shadow hover:bg-secondary-300 focus:bg-secondary-500 active:bg-secondary-700",
        outline_primary: "border-2 border-primary-500 text-primary-500 bg-transparent hover:border-primary-300 hover:text-primary-300 active:bg-primary-50 active:border-primary-700 active:text-primary-700",
        outline_secondary: "border-2 border-secondary-500 text-secondary-500 bg-transparent hover:border-secondary-300 hover:text-secondary-300 active:bg-secondary-50 active:border-secondary-700 active:text-secondary-700",
        outline_neutral: "border-2 border-neutral-500 text-neutral-500 bg-transparent hover:border-neutral-300 hover:text-neutral-300 active:border-neutral-500 active:text-neutral-500",
        icon: "-m-3 p-3 text-white hover:bg-white/10 rounded-full",
        unstyled: "",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-10 px-8",
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