import { cva } from "class-variance-authority"

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:h-4 [&_svg]:w-4",
  {
    variants: {
      variant: {
        // ————————————————————— Primary Filled —————————————————————
        primary_filled: [
          "bg-keppel-500 text-white shadow-sm",
          "hover:bg-keppel-400",
          "focus-visible:ring-2 focus-visible:ring-keppel-500",
          "active:bg-keppel-700",
        ].join(" "),
        // ————————————————————— Secondary Filled ————————————————————
        secondary_filled: [
          "bg-sunglow-400 text-black shadow-sm",
          "hover:bg-sunglow-200",
          "focus-visible:ring-2 focus-visible:ring-sunglow-400",
          "active:bg-sunglow-700",
        ].join(" "),
        // ————————————————————— Primary Outlined ————————————————————
        primary_outlined: [
          "bg-transparent border-2 border-keppel-500 text-keppel-500",
          "hover:border-keppel-400 hover:text-keppel-400",
          "focus-visible:ring-2 focus-visible:ring-keppel-500",
          "active:bg-keppel-50 active:border-keppel-700 active:text-keppel-700",
        ].join(" "),
        // ————————————————————— Secondary Outlined ———————————————————
        secondary_outlined: [
          "bg-transparent border-2 border-sunglow-400 text-sunglow-400",
          "hover:border-sunglow-200 hover:text-sunglow-200",
          "focus-visible:ring-2 focus-visible:ring-sunglow-400",
          "active:bg-sunglow-50 active:border-sunglow-700 active:text-sunglow-700",
        ].join(" "),
        // ————————————————————— Black Filled ——————————————————————
        black_filled: [
          "bg-neutral-900 text-white shadow-sm",
          "hover:bg-neutral-700",
          "focus-visible:ring-2 focus-visible:ring-neutral-900",
          "active:bg-neutral-800",
        ].join(" "),
        // ——————————————————— Icon Only (filled, for black icon buttons) ———————————————————
        icon_only: [
          "inline-flex items-center justify-center rounded-full",
          "bg-neutral-900 text-white shadow-sm",
          "hover:bg-neutral-700",
          "focus-visible:ring-2 focus-visible:ring-neutral-900",
          "active:bg-neutral-800",
        ].join(" "),
        unstyled: "",
      },

      size: {
        default: "h-9 px-4 text-sm",
        sm: "h-8 px-3 text-xs",
        lg: "h-10 px-8 text-base",
        // big circle for icon-only
        icon: "h-9 w-9 p-0",
        // small circle for icon-only
        "icon-sm": "h-8 w-8 p-0",
      },

      iconPosition: {
        none: "justify-center",
        left: "flex-row",
        right: "flex-row-reverse",
      },
    },

    defaultVariants: {
      variant: "primary_filled",
      size: "default",
      iconPosition: "none",
    },
  }
);


export const badgeVariants = cva("inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded-full", {
  variants: {
    color: {
      keppel: "bg-keppel-500 text-white",
      sunglow: "bg-sunglow-400 text-black",
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
