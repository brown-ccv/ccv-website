import { cva } from "class-variance-authority"

export const CardVariants = cva("bg-white", {
  variants: {
    size: {
      custom: "",
      xs: "w-full max-w-xs sm:max-w-xs",
      sm: "w-full max-w-sm sm:max-w-sm",
      md: "w-full max-w-full sm:max-w-md sm:w-80 flex-shrink-0",
      lg: "w-full max-w-full sm:max-w-lg flex-shrink-0",
    },
  },

  defaultVariants: {
    size: "sm",
  },
})
