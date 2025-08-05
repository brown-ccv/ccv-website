"use client"

import { scrollToID } from "@/lib/utils"
import { Button, ButtonProps } from "@/components/button/Button"

interface ScrollButtonProps extends ButtonProps {
  id: string
}

export const ScrollButton = ({ id, children, ...props }: ScrollButtonProps) => {
  return (
    <Button onClick={() => scrollToID(id)} {...props}>
      {children}
    </Button>
  )
}
