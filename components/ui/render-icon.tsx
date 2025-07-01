import React from 'react';
import * as Fa from 'react-icons/fa';
// utility component to map icon names as strings in content folder to icon components from react-icons

const iconLibraries: Record<string, Record<string, React.ComponentType>> = {
  Fa: Fa,
};

interface IconProps {
  iconName?: string;
  size?: string | number;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ iconName, size, className }) => {
  if (!iconName) {
    return null;
  }

  // Attempt to find the icon in the specified libraries
  for (const prefix in iconLibraries) {
    if (iconName.startsWith(prefix)) {
      const iconKey = iconName;
      const IconComponent = iconLibraries[prefix][iconKey];

      if (IconComponent) {
        const props: Record<string, any> = {};
        if (size) props.size = size;
        if (className) props.className = className;

        return React.createElement(IconComponent, props);
      }
    }
  }

  // If the icon is not found in any library
  console.error(`Icon "${iconName}" not found in react-icons libraries.`);
  return null;
};

export default Icon;