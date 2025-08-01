import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import Icon from "@/components/ui/RenderIcon"
import React from "react"

interface CardContainerProps {
  iconName?: string
  title: string
  children: React.ReactNode
}

export const CardContainer: React.FC<CardContainerProps> = ({
  iconName,
  title,
  children,
}) => {
  const IconComponent = iconName ? Icon : null
  return (
    <Card className="w-full max-w-sm bg-white">
      <CardHeader>
        <CardTitle className="flex gap-4 items-center justify-center text-3xl border-b border-gray-300 py-4">
          {IconComponent && (
            <IconComponent
              iconName={iconName}
              className="text-2xl flex-shrink-0 mt-1"
            />
          )}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-xl">{children}</CardContent>
    </Card>
  )
}
