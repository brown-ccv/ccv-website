import React from "react"
import { cn } from "@/lib/utils"
import { cardVariants } from "./variants"

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "left" | "center" | "right"
}

interface CardDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "left" | "center" | "right"
}

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "people" | "content"; size?: "fit" | "contained" }
>(({ className, variant = "default", size, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      cardVariants({ variant, size }),
      className,
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  CardHeaderProps
>(({ className, align = "left", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col space-y-1.5 py-4 sm:py-6 font-semibold text-3xl",
      align === "center" && "text-center",
      align === "right" && "text-right",
      className
    )}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight text-lg", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  CardDescriptionProps
>(({ className, align = "left", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-sm text-muted-foreground [&_ul]:list-none [&_ol]:list-none [&_li]:list-none",
      align === "center" && "text-center",
      align === "right" && "text-right",
      className
    )}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-4 sm:p-6 [&_ul]:list-none [&_ol]:list-none [&_li]:list-none", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-4 sm:p-6", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
}
