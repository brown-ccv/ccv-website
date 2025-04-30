"use client"

import { scrollToID } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/variants"
import { Button } from "@/components/ui/button"
import type { VariantProps } from "class-variance-authority"


export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    id: string
}

export const ScrollButton = ( {id, children, ...props}: ButtonProps ) => {
    return (
        <Button
            className="h-[55px] min-w-[155px] self-start"
            onClick={() => scrollToID(id)}
            {...props}
        >
            {children}
        </Button>
    )}
