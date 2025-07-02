# Badge System Documentation

This document explains how to use the refactored badge system that provides automatic color determination and improved reusability.

## Overview

The badge system has been refactored to:
- Automatically determine appropriate colors based on feature values
- Provide consistent styling across the application
- Support both traditional and automatic color modes
- Include utility functions for color management

## Basic Usage

### Traditional Badge (Predefined Colors)

```tsx
import { Badge } from '@/components/ui/badge';

// Use predefined color variants
<Badge color="keppel">Success</Badge>
<Badge color="sunglow">Warning</Badge>
<Badge color="red">Error</Badge>
<Badge color="blue">Info</Badge>
```

### Automatic Color Badge (Feature Values)

```tsx
import { Badge } from '@/components/ui/badge';

// Automatic color based on value
<Badge value="high" autoColor>High Priority</Badge>
<Badge value={true} autoColor>Available</Badge>
<Badge value="fast" autoColor>Fast Speed</Badge>
<Badge value="unlimited" autoColor>Unlimited Storage</Badge>
```

## Available Color Variants

### Basic Colors
- `keppel` - Green (success)
- `sunglow` - Yellow (warning)
- `red` - Red (error/danger)
- `blue` - Blue (info)
- `purple` - Purple
- `pink` - Pink

### Semantic Colors
- `high` - Red (high priority/security)
- `medium` - Amber (medium priority)
- `low` - Green (low priority)
- `true` - Green (available/positive)
- `false` - Red (unavailable/negative)
- `easy` - Green (easy complexity)
- `complex` - Red (complex difficulty)
- `partial` - Yellow (partial availability)

### Storage-Specific Colors
- `hot` - Red (hot storage)
- `warm` - Yellow (warm storage)
- `cold` - Cyan (cold storage)
- `fastest` - Green (fastest speed)
- `faster` - Amber (faster speed)
- `fast` - Yellow (fast speed)
- `slow` - Red (slow speed)

## Utility Functions

### `getBadgeStyling(value)`

Returns complete styling information for a feature value:

```tsx
import { getBadgeStyling } from '@/lib/utils';

const styling = getBadgeStyling('high');
// Returns: { backgroundColor: 'bg-red-university', textColor: 'text-white', className: 'bg-red-university text-white' }
```

### `getTextColorForBackground(backgroundColor)`

Determines whether text should be white or black based on background color:

```tsx
import { getTextColorForBackground } from '@/lib/utils';

const textColor = getTextColorForBackground('bg-keppel-600');
// Returns: 'text-white'
```

### `getBadgeBackgroundColor(value)`

Maps feature values to background colors:

```tsx
import { getBadgeBackgroundColor } from '@/lib/utils';

const bgColor = getBadgeBackgroundColor('high');
// Returns: 'bg-red-university'
```

## Examples

### Storage Service Card Usage

```tsx
// In StorageServiceCard.tsx
<Badge
  value={feature.value}
  autoColor={true}
  className="rounded-full font-semibold text-sm ml-2"
>
  {formatFeatureDisplayValue(feature)}
</Badge>
```

### Custom Styling

```tsx
// Add custom classes while keeping automatic colors
<Badge 
  value="high" 
  autoColor 
  className="text-sm px-3 py-1 border-2 border-current"
>
  Custom Styled Badge
</Badge>
```

### Feature-Based Badges

```tsx
// Use semantic colors for specific features
<Badge color="high">Security Level</Badge>
<Badge color="fast">Performance</Badge>
<Badge color="large">Capacity</Badge>
```

## Migration Guide

### From Old StorageServiceCard

**Before:**
```tsx
const valueColor = featureColorMap[featureClassLower] || featureColorMap['default'];
<Badge className={cn("rounded-full font-semibold text-sm bg-`${valueColor}`")}>
  {formatFeatureDisplayValue(feature)}
</Badge>
```

**After:**
```tsx
<Badge
  value={feature.value}
  autoColor={true}
  className="rounded-full font-semibold text-sm ml-2"
>
  {formatFeatureDisplayValue(feature)}
</Badge>
```

## Best Practices

1. **Use `autoColor` for feature values** - This ensures consistent color mapping across the application
2. **Use predefined colors for UI elements** - Use `color` prop for buttons, status indicators, etc.
3. **Combine with custom styling** - Add custom classes for specific design requirements
4. **Test accessibility** - The system automatically handles text contrast, but verify in your specific use case

## Color Mapping Logic

The automatic color system maps values to colors based on semantic meaning:

- **High/True/Positive** → Green (keppel)
- **Medium/Partial** → Yellow (sunglow/amber)
- **Low/False/Negative** → Red (red-university)
- **Storage temperatures** → Red (hot), Yellow (warm), Cyan (cold)
- **Speed levels** → Green (fastest), Amber (faster), Yellow (fast), Red (slow)
- **Storage sizes** → Based on capacity (small → cyan, large → yellow, unlimited → green) 