import React from 'react';
import { Badge } from './badge';

/**
 * Example component demonstrating the various ways to use the refactored Badge system
 * This can be used as a reference for other developers
 */
export const BadgeExamples: React.FC = () => {
  return (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-bold">Badge System Examples</h2>
      
      {/* Traditional usage with predefined colors */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Traditional Badge Colors</h3>
        <div className="flex gap-2 flex-wrap">
          <Badge color="keppel">Keppel</Badge>
          <Badge color="sunglow">Sunglow</Badge>
          <Badge color="red">Red</Badge>
          <Badge color="blue">Blue</Badge>
          <Badge color="purple">Purple</Badge>
          <Badge color="pink">Pink</Badge>
        </div>
      </div>

      {/* Automatic color based on feature values */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Automatic Colors (Feature Values)</h3>
        <div className="flex gap-2 flex-wrap">
          <Badge value="high" autoColor>High Priority</Badge>
          <Badge value="medium" autoColor>Medium Priority</Badge>
          <Badge value="low" autoColor>Low Priority</Badge>
          <Badge value={true} autoColor>Available</Badge>
          <Badge value={false} autoColor>Unavailable</Badge>
          <Badge value="fast" autoColor>Fast Speed</Badge>
          <Badge value="slow" autoColor>Slow Speed</Badge>
          <Badge value="easy" autoColor>Easy Setup</Badge>
          <Badge value="complex" autoColor>Complex Setup</Badge>
        </div>
      </div>

      {/* Storage-specific examples */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Storage Service Examples</h3>
        <div className="flex gap-2 flex-wrap">
          <Badge value="hot" autoColor>Hot Storage</Badge>
          <Badge value="warm" autoColor>Warm Storage</Badge>
          <Badge value="cold" autoColor>Cold Storage</Badge>
          <Badge value="1 tb" autoColor>1 TB</Badge>
          <Badge value="unlimited" autoColor>Unlimited</Badge>
          <Badge value="4 gb" autoColor>4 GB</Badge>
        </div>
      </div>

      {/* Feature-based examples using predefined colors */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Feature-Based Examples</h3>
        <div className="flex gap-2 flex-wrap">
          <Badge color="high">Security</Badge>
          <Badge color="fast">Speed</Badge>
          <Badge color="medium-cost">Cost</Badge>
          <Badge color="large">Capacity</Badge>
          <Badge color="partial">Integration</Badge>
        </div>
      </div>

      {/* Custom styling examples */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Custom Styling</h3>
        <div className="flex gap-2 flex-wrap">
          <Badge value="high" autoColor className="text-sm px-3 py-1">Custom Size</Badge>
          <Badge value="medium" autoColor className="border-2 border-current">With Border</Badge>
          <Badge value="low" autoColor className="shadow-lg">With Shadow</Badge>
        </div>
      </div>
    </div>
  );
}; 