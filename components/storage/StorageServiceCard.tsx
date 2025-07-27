// src/components/ui/ServiceCard.tsx
import React from 'react';
import { ServiceConfig, QuestionsConfig, SelectedAnswers, ServiceFeature, featureIcons } from '@/lib/storage-types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge'
import { cn, humanize } from "@/lib/utils"
import { sortFeatures } from '@/components/storage/utils';

interface ServiceCardProps {
    service: ServiceConfig;
    questionsConfig: QuestionsConfig[];
    selectedAnswers: SelectedAnswers;
    isDisabled: boolean;
  }

const StorageServiceCard: React.FC<ServiceCardProps> = ({ service, questionsConfig, isDisabled }) => {

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
      <div className="ml-8 text-sm text-neutral-500 font-normal italic tracking-tight">
        <ul className="list-disc list-inside space-y-0.5">
          {notes.map((note, index) => (
            <li key={index}>{note}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <Card className={cn("w-full bg-white")}>
      <div className={cn("transition-opacity duration-300", isDisabled ? 'opacity-30 grayscale' : '')}>
        <CardHeader className="flex items-center justify-center">
          <CardTitle className="text-2xl pt-4">{humanize(service.name)}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-md mx-6 mb-4">
          {service.features?.map((feature) => {
            const IconComponent = featureIcons[feature.name.toLowerCase()];

            return (
              <div key={feature.name} className="space-y-2">
                {/* Feature name and icon */}
                <div className="flex items-center gap-2 text-neutral-500 font-semibold tracking-wide">
                  {IconComponent ? <IconComponent className="text-lg flex-shrink-0" /> : null}
                  <span className="flex-shrink-0">{humanize(feature.name).toUpperCase()}:</span>
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