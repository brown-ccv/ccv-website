import { cva } from "class-variance-authority"

export const ButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-ring focus:outline-none focus-visible:ring-2 focus-visible:ring-sunglow-400 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 not-prose",
  {
    variants: {
      variant: {
        // ————————————————————— Primary Filled —————————————————————
        primary_filled: [
          "bg-keppel-700 text-white",
          "hover:bg-keppel-500",
          "focus-visible:ring-2 focus-visible:ring-keppel-500",
          "active:bg-keppel-600",
        ].join(" "),
        // ————————————————————— Secondary Filled ————————————————————
        secondary_filled: [
          "bg-sunglow-400 text-black",
          "hover:bg-sunglow-200",
          "focus-visible:ring-2 focus-visible:ring-sunglow-200",
          "active:bg-sunglow-300",
        ].join(" "),
        // ————————————————————— Primary Outlined ————————————————————
        primary_outlined: [
          "bg-transparent border-2 border-keppel-700 text-keppel-700",
          "hover:bg-keppel-500 hover:text-white",
          "focus-visible:ring-2 focus-visible:ring-keppel-500",
          "active:bg-keppel-50 active:bg-keppel-600 active:text-white",
        ].join(" "),
        // ————————————————————— Secondary Outlined ———————————————————
        secondary_outlined: [
          "bg-transparent border-2 border-sunglow-400 text-sunglow-400",
          "hover:bg-sunglow-400 hover:text-white",
          "focus-visible:ring-2 focus-visible:ring-sunglow-400",
          "active:bg-sunglow-50 active:bg-sunglow-300 active:text-white",
        ].join(" "),
        // ————————————————————— Red Outlined ————————————————————
        red_outlined: [
          "items-center justify-center text-md sm:text-lg font-semibold",
          "rounded-none border-2 border-red-university text-red-university",
          "hover:bg-red-university hover:text-white",
          "focus-visible:bg-red-university focus:text-white focus-visible:border-red-university whitespace-nowrap",
        ].join(" "),
        // ————————————————————— Black Filled ——————————————————————
        black_filled: [
          "bg-neutral-900 text-white",
          "hover:bg-neutral-700",
          "focus-visible:ring-2 focus-visible:ring-neutral-700",
          "active:bg-neutral-800",
        ].join(" "),
        // ——————————————————— Icon Only (filled, for black icon buttons) ———————————————————
        icon_only: [
          "bg-transparent",
          "hover:bg-white hover:text-black active:bg-neutral-50",
        ].join(" "),
        unstyled: "",
      },

      size: {
        default: "h-9 px-4 py-2 text-md", //h-9 px-4 py-2
        sm: "h-8 px-3 py-3 text-xs",
        md: "h-8 px-6 py-6 text-md",
        lg: "h-8 px-6 py-6 text-md sm:h-10 sm:px-8 sm:py-8 sm:text-2xl",
        xl: "h-8 px-6 py-6 text-md sm:h-14 sm:px-8 sm:py-8 sm:text-2xl",
        xxl: "h-8 px-6 py-6 text-md sm:h-16 sm:px-10 sm:py-10 sm:text-3xl",

        // large icon-only
        icon: "w-8 h-8 sm:w-10 sm:h-10",
        // small circle for icon-only
        "icon-sm": "h-6 w-6",
      },

      iconPosition: {
        none: "justify-center",
        left: "flex-row",
        right: "flex-row-reverse",
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
      iconPosition: "none",
      align: "center",
    },
  }
)
