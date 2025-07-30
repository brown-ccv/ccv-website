"use client"

import { scrollToID } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/variants"
import { Button } from "@/components/ui/Button"
import type { VariantProps } from "class-variance-authority"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  id: string
}

export const ScrollButton = ({ id, children, ...props }: ButtonProps) => {
  return (
    <Button onClick={() => scrollToID(id)} {...props}>
      {children}
    </Button>
  )
}
