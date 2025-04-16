import { cva } from "class-variance-authority"

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
