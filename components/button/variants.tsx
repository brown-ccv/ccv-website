import { cva } from "class-variance-authority"

export const ButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-md font-bold transition-colors focus-visible:outline-none focus-visible:ring-ring focus:outline-none focus-visible:ring-2 focus-visible:ring-sunglow-400 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 not-prose",
  {
    variants: {
      variant: {
        // ————————————————————— Primary Filled —————————————————————
        primary_filled: [
          "bg-keppel-700 text-white",
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
          "bg-transparent border-2 border-keppel-700 text-keppel-700",
          "hover:bg-keppel-700 hover:text-white",
          "focus-visible:ring-sunglow-300",
          "active:bg-keppel-600",
        ].join(" "),
        // ————————————————————— Secondary Outlined ———————————————————
        secondary_outlined: [
          "bg-transparent border-2 border-sunglow-400 text-sunglow-400",
          "hover:bg-sunglow-400 hover:text-black",
          "focus-visible:ring-keppel-400",
          "active:bg-sunglow-300",
        ].join(" "),
        // ————————————————————— Red Outlined ————————————————————
        red_outlined: [
          "bg-transparent border-2 border-red-university text-red-university",
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
        // ——————————————————— Icon Only (filled, for black icon buttons) ———————————————————
        icon_only: [
          "bg-transparent",
          "hover:bg-white hover:text-black active:bg-neutral-50",
        ].join(" "),
        unstyled: "",
      },

      size: {
        sm: "h-8 px-4 py-2 text-sm",
        md: "h-10 px-5 py-2.5 text-md",
        lg: "h-12 px-6 py-3 text-lg",
        xl: "h-14 px-8 py-4 text-xl",
        xxl: "h-16 px-10 py-5 text-2xl",

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
      size: "md",
      iconPosition: "none",
      align: "center",
    },
  }
  )