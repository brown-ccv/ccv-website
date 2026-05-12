import { cva } from "class-variance-authority"

export const ButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none focus-visible:ring-sunglow-400 disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // ————————————————————— Primary Filled —————————————————————
        primary_filled: [
          "bg-keppel-800 text-white",
          "hover:bg-keppel-500",
          "focus-visible:ring-sunglow-300",
          "active:bg-keppel-600",
        ].join(" "),
        // ————————————————————— Secondary Filled ————————————————————
        secondary_filled: [
          "bg-sunglow-400 text-black",
          "hover:bg-sunglow-200",
          "focus-visible:ring-keppel-400",
          "active:bg-sunglow-300",
        ].join(" "),
        // ————————————————————— Primary Outlined ————————————————————
        primary_outlined: [
          "bg-transparent text-keppel-800",
          "border-2 border-keppel-800",
          "hover:bg-keppel-800 hover:text-white",
          "focus-visible:ring-sunglow-300",
          "active:bg-keppel-600",
        ].join(" "),
        // ————————————————————— Secondary Outlined ———————————————————
        secondary_outlined: [
          "bg-transparent text-sunglow-400",
          "border-2 border-sunglow-400",
          "hover:bg-sunglow-400 hover:text-black",
          "focus-visible:ring-keppel-400",
          "active:bg-sunglow-300",
        ].join(" "),
        // ————————————————————— Red Outlined ————————————————————
        red_outlined: [
          "bg-transparent text-red-university",
          "border-2 border-red-university",
          "hover:bg-red-university hover:text-white",
          "focus-visible:ring-keppel-400",
          "active:bg-red-university/80",
          "rounded-none",
        ].join(" "),
        // ————————————————————— Black Filled ——————————————————————
        black_filled: [
          "bg-neutral-900 text-white",
          "hover:bg-neutral-700",
          "focus-visible:ring-sunglow-200",
          "active:bg-neutral-800",
        ].join(" "),
        unstyled: "",
      },
      size: {
        default: "h-10 px-4 px-6",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-6",
        xl: "h-14 px-8 text-base",
        icon: "h-9 w-9",
      },
      align: {
        left: "justify-start",
        center: "justify-center",
        right: "justify-end",
      },
    },
    defaultVariants: {
      variant: "primary_filled",
      size: "default",
      align: "center",
    },
  }
)
