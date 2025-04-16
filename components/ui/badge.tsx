import React from "react"
import { cn } from "@/lib/utils"
import { badgeVariants } from "@/components/ui/badgeVariants"
import type { VariantProps } from "class-variance-authority"

type BadgeProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof badgeVariants>

export const Badge = ({ color, className, ...props }: BadgeProps) => {
  return (
    <div className={cn(badgeVariants({ color }), className)} {...props} />
  )
}
