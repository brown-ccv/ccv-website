import React from "react"
import { cn } from "@/lib/utils"
import Image from 'next/image';
import { cardVariants } from "@/components/ui/variants"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow",
      className,
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-4 sm:p-6", className)}
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
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-4 sm:p-6", className)} {...props} />
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

interface CardWithImageProps extends React.HTMLAttributes<HTMLDivElement> {
  imagePath: string;
  name: string;
  title: string;
}

const CardWithImage: React.FC<CardWithImageProps> = ({ className, imagePath, name, title, ...props }) => {

  return (
    <Card className={cn(className, "overflow-hidden", cardVariants({ variant: "people" }),)}>
      <CardContent>
        <div className="relative">
          <Image
            src={imagePath}
            alt={name}
            width="300"
            height="300"
            objectFit="cover"
            className="rounded-full w-full"
          />
        </div>
        <div>
          <CardTitle className="text-2xl text-center py-4">{name}</CardTitle>
          <CardDescription className="text-xl italic text-center">{title}</CardDescription>
        </div>
      </CardContent>
    </Card>
  );
};

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardWithImage,
}
