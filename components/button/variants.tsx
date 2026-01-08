import { cva } from "class-variance-authority"

export const ButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-md font-bold transition-colors focus-visible:outline-none focus-visible:ring-ring focus:outline-none focus-visible:ring-2 focus-visible:ring-sunglow-400 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
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
        // ————————————————————— Ghost ——————————————————————
        ghost: [
          "bg-transparent text-current",
          "hover:bg-neutral-100",
          "focus-visible:ring-sunglow-300",
          "active:bg-neutral-200",
        ].join(" "),
        unstyled: "",
      },

      size: {
        sm: "h-8 px-4 py-2 text-sm",
        md: "h-10 px-5 py-2.5 text-md",
        lg: "h-12 px-6 py-3 text-lg",
        xl: "h-14 px-8 py-4 text-xl",
        xxl: "h-16 px-10 py-5 text-2xl",
      },

      align: {
        left: "justify-start",
        center: "justify-center",
        right: "justify-end",
      },
    },

    defaultVariants: {
      variant: "primary_filled",
      size: "md",
      align: "center",
    },
  }
)
