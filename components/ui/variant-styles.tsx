import { cva } from "class-variance-authority"

export const buttonVariants = cva(
  "rounded-full text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary_filled: "bg-keppel-500 text-white shadow hover:bg-keppel-300 focus:bg-keppel-500 active:bg-keppel-700",
        secondary_filled: "bg-sunglow-500 text-black shadow hover:bg-sunglow-300 focus:bg-sunglow-500 active:bg-sunglow-700",
        primary_outlined: "border-2 border-keppel-500 text-keppel-500 bg-transparent hover:border-keppel-300 hover:text-keppel-300 active:bg-keppel-50 active:border-keppel-700 active:text-keppel-700",
        secondary_outlined: "border-2 border-sunglow-500 text-sunglow-500 bg-transparent hover:border-sunglow-300 hover:text-sunglow-300 active:bg-sunglow-50 active:border-sunglow-700 active:text-sunglow-700",
        black_filled: "border-2 border-black text-white hover:border-neutral-700 hover:text-white active:border-neutral-700 active:text-white",
        icon_only_outlined: "-m-3 p-3 text-black hover:border-neutral-700 rounded-full",
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
      variant: "primary_filled",
      size: "default",
      iconPosition: "none",
    },
  }
)

export const badgeVariants = cva("inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded-full", {
  variants: {
    color: {
      keppel: "bg-keppel-500 text-white",
      sunglow: "bg-sunglow-500 text-black",
      purple: "bg-purple-500 text-white",
      sky: "bg-sky-500 text-white",
      emerald: "bg-emerald-500 text-white",
      lime: "bg-lime-500 text-black",
      amber: "bg-amber-500 text-black",
      rose: "bg-rose-500 text-white",
      cyan: "bg-cyan-500 text-white",
      blue: "bg-500 text-white",
    },
  },
  defaultVariants: {
    color: "keppel",
  },
})

export const cardVariants = cva(
  "rounded-xl bg-white text-black transition-shadow",
  {
    variants: {
      variant: {
        default: "border bg-card text-card-foreground shadow",
        elevated: "shadow-lg border border-neutral-200 ", 
        ghost: "border-none bg-transparent shadow-none",
        outlined: "border border-gray-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)
