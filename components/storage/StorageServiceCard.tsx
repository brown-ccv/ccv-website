// src/components/ui/ServiceCard.tsx
import React from 'react';
import { ServiceConfig, ServiceFeature, featureIcons } from '@/lib/storage-types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge'
import { cn, humanize } from "@/lib/utils"
import { cardVariants } from '@/components/ui/variants';
// import { sortFeatures } from '@/components/storage/utils';


interface ServiceCardProps {
    service: ServiceConfig;
    isDisabled: boolean;
  }

const StorageServiceCard: React.FC<ServiceCardProps> = ({ service, isDisabled }) => {

  // Helper to format the display value of a feature class
  const formatFeatureDisplayValue = (feature: ServiceFeature): string => {
    if (typeof feature.value === 'boolean') {
      return feature.value ? 'Yes' : 'No';
    }
    if (feature.name === 'security' && typeof feature.value === 'number') {
      return `Level ${feature.value}`;
    }
    return String(feature.value);
  };

  // Helper to render notes
  const renderNotes = (notes: string[]) => {
    if (!notes || notes.length === 0) return null;
    
    return (
      <div className="ml-6 text-sm text-neutral-500 font-normal italic tracking-tight">
        <ul className="list-disc list-inside space-y-0.5">
          {notes.map((note, index) => (
            <li key={index} className="break-words">{note}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <Card className={cn(cardVariants({ variant: "default" }), "bg-white")}>
    {/* <Card className={cn("w-full bg-white border-neutral-300")}> */}
      <div className={cn("transition-opacity duration-300", isDisabled ? 'opacity-30 grayscale' : '')}>
        <CardHeader className="flex items-center justify-center">
          <CardTitle className="text-2xl pt-4 text-center">{humanize(service.name)}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm mx-4 mb-4">
          {service.features?.map((feature) => {
            const IconComponent = featureIcons[feature.name.toLowerCase()];

            return (
              <div key={feature.name} className="space-y-2">
                {/* Feature name and icon */}
                <div className="flex items-start gap-2 text-neutral-500 font-semibold tracking-wide">
                  {IconComponent ? <IconComponent className="text-lg flex-shrink-0 mt-0.5" /> : null}
                  <span className="break-words">{humanize(feature.name).toUpperCase()}:</span>
                </div>
                
                {/* Badge on its own line */}
                <div className="ml-6">
                  <Badge
                    value={feature.value}
                    autoColor={true}
                    className="rounded-full font-semibold text-sm"
                  >
                    {humanize(formatFeatureDisplayValue(feature))}
                  </Badge>
                </div>
                
                {/* Notes row - appears below when there are notes */}
                {feature.notes && renderNotes(feature.notes)}
              </div>
            );
          })}
        </CardContent>
      </div>
    </Card>
  );
};

export default StorageServiceCard;