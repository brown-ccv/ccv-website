import React from "react"
import { cn } from "@/lib/utils"
import Image from 'next/image';

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
    className={cn("font-semibold leading-none tracking-tight text-lg sm:text-xl", className)}
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
}

const CardWithImage: React.FC<CardWithImageProps> = ({ className, imagePath, name, ...props }) => {
  const imageWidth = 300;
  const imageHeight = 200;

  return (
    <Card className={cn(className, "overflow-hidden")}>
      <CardContent className="p-0">
        <div className="relative">
          <Image
            src={imagePath}
            alt={name}
            width={imageWidth}
            height={imageHeight}
            objectFit="cover"
            className="rounded-t-xl w-full"
          />
        </div>
        <div className="p-4 sm:p-6">
          <CardTitle>{name}</CardTitle>
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
