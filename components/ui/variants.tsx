import { cva, VariantProps } from "class-variance-authority"

export const buttonVariants = cva(
  "inline-flex items-center justify-center flex-shrink-0 whitespace-nowrap w-auto mr-6 font-semibold rounded-full text-xl transition-colors focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none",
  {
    variants: {
      variant: {
        // ————————————————————— Primary Filled —————————————————————
        primary_filled: [
          "bg-keppel-700 text-white shadow-sm",
          "hover:bg-keppel-500",
          "focus-visible:ring-2 focus-visible:ring-keppel-600",
          "active:bg-keppel-600",
        ].join(" "),
        // ————————————————————— Secondary Filled ————————————————————
        secondary_filled: [
          "bg-sunglow-400 text-black shadow-sm",
          "hover:bg-sunglow-200",
          "focus-visible:ring-2 focus-visible:ring-sunglow-300",
          "active:bg-sunglow-300",
        ].join(" "),
        // ————————————————————— Primary Outlined ————————————————————
        primary_outlined: [
          "bg-transparent border-2 border-keppel-700 text-keppel-700",
          "hover:border-keppel-500 hover:text-keppel-500",
          "focus-visible:ring-2 focus-visible:ring-keppel-600",
          "active:bg-keppel-50 active:border-keppel-600 active:text-keppel-600",
        ].join(" "),
        // ————————————————————— Secondary Outlined ———————————————————
        secondary_outlined: [
          "bg-transparent border-2 border-sunglow-400 text-sunglow-400",
          "hover:border-sunglow-200 hover:text-sunglow-200",
          "focus-visible:ring-2 focus-visible:ring-sunglow-400",
          "active:bg-sunglow-50 active:border-sunglow-300 active:text-sunglow-300",
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
        // —————————————————— icon only, outlined ——————————————————
        icon_only_outlined: [
          "bg-transparent",
          "border-2 border-neutral-900 text-neutral-900",
          "hover:border-neutral-700 hover:text-neutral-700",
          "focus-visible:ring-2 focus-visible:ring-neutral-900",
          "active:bg-neutral-50 active:border-neutral-700 active:text-neutral-700",
        ].join(" "),
      },

      size: {
        default: "h-9 px-6 py-6 text-xl",
        sm: "h-8 px-3 py-3 text-xs",
        md: "h-8 px-6 py-6 text-md",
        lg: "h-10 px-8 py-8 text-2xl",
        xl: "h-14 px-8 py-8 text-2xl",
        xxl: "h-16 px-10 py-10 text-3xl",

        // large icon-only
        icon: "h-12 w-12 p-2 h-10 w-10",
        // small circle for icon-only
        "icon-sm": "h-8 w-8 p-2 h-8 w-8",
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

export const badgeVariants = cva("inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded-full whitespace-nowrap", {
  variants: {
    color: {
      // Shared colors
      keppel: "bg-keppel-500 text-white",
      sunglow: "bg-sunglow-400 text-black",
      purple: "bg-purple-900 text-white", 
      blue: "bg-blue-500 text-white",
      red: "bg-red-university text-white", 
      pink: "bg-pink-500 text-white",
    },
  },
  defaultVariants: {
    color: "keppel",
  },
})

export type BadgeProps = VariantProps<typeof badgeVariants>;

export const cardVariants = cva(
  "rounded-xl bg-white text-black transition-shadow",
  {
    variants: {
      variant: {
        default: "shadow-lg border border-neutral-200",
        people: "border-none shadow-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)