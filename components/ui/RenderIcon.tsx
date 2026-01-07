import React from "react"
import * as Fa from "react-icons/fa"
import { cn } from "@/lib/utils"
import type { IconType } from "react-icons"
// utility component to map icon names as strings in content folder to icon components from react-icons

const iconLibraries: Record<string, Record<string, IconType>> = {
  Fa: Fa
}

type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const iconSizes: Record<IconSize, string> = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12',
}

interface IconProps {
  iconName?: string
  size?: IconSize
  className?: string
}

const Icon: React.FC<IconProps> = ({ iconName, size = "md", className }) => {
  if (!iconName) {
    return null
  }

  // Attempt to find the icon in the specified libraries
  for (const prefix in iconLibraries) {
    if (iconName.startsWith(prefix)) {
      const IconComponent = iconLibraries[prefix][iconName]

      if (IconComponent) {
        return (
          <IconComponent
            className={cn(iconSizes[size], className)}
          />
        )
      }
    }
  }

  // If the icon is not found in any library
  console.error(`Icon "${iconName}" not found in react-icons libraries.`)
  return null
}

export default Icon
