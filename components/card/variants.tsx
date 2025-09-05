import { cva } from "class-variance-authority"

export const CardVariants = cva("bg-white", {
  variants: {
    variant: {
      custom: "",
      sticky: [
        "relative z-10",
        "-mt-[170px] mb-[120px]",
        "flex justify-center px-6 lg:mx-12 lg:px-8",
      ].join(" "),
      people: "border-none shadow-none",
    },
    size: {
      custom: "",
      sm: "max-w-sm md:max-w-xs",
      md: "max-w-md",
      lg: "max-w-lg flex-shrink-0",
    },
  },

  defaultVariants: {
    variant: "custom",
    size: "sm",
  },
})
