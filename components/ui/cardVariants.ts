import { cva } from "class-variance-authority"

export const cardVariants = cva(
  "rounded-xl bg-white text-black transition-shadow",
  {
    variants: {
      variant: {
        default: "border bg-card text-card-foreground shadow",
        elevated: "shadow-lg border border-neutral-200",
        ghost: "border-none bg-transparent shadow-none",
        outlined: "border border-gray-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)
