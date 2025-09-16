import { cva } from "class-variance-authority"

export const CardVariants = cva("bg-white", {
  variants: {
    size: {
      custom: "",
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg flex-shrink-0",
    },
  },

  defaultVariants: {
    size: "sm",
  },
})
