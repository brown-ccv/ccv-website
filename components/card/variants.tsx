import { cva } from "class-variance-authority"

export const CardVariants = cva("bg-white", {
  variants: {
    size: {
      custom: "",
      sm: "max-w-sm",
      md: "max-w-md w-80 flex-shrink-0",
      lg: "max-w-lg flex-shrink-0",
    },
  },

  defaultVariants: {
    size: "sm",
  },
})
