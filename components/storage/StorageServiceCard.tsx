// src/components/ui/ServiceCard.tsx
import React from 'react';
import { ServiceConfig, QuestionsConfig, SelectedAnswers, ServiceFeature, featureIcons, featureColorMap } from '@/lib/storage-types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
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

  return (
    <Card className={cn("w-full bg-white")}>
      <div className={cn("transition-opacity duration-300", isDisabled ? 'opacity-30 grayscale' : '')}>
        <CardHeader className="flex items-center justify-center">
          <CardTitle className="text-2xl pt-4">{humanize(service.name)}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-lg mx-6 mb-4">
          {sortFeatures(service.features || [], questionsConfig).map((feature) => {
            const IconComponent = featureIcons[feature.name.toLowerCase()];
            const featureClassLower = String(feature.value).toLowerCase();
            const valueColor = featureColorMap[featureClassLower] || featureColorMap['default'];

            return (
              <div key={feature.name} className="flex py-1">
                <div className="flex items-center gap-2 text-neutral-500 tracking-wider">
                  {IconComponent ? <IconComponent className="text-xl" /> : null}
                  {humanize(feature.name).toUpperCase()}:
                  <div className={cn("font-semibold tracking-tight", valueColor)}>
                    {humanize(formatFeatureDisplayValue(feature))}
                  </div>
                  {feature.notes && (
                    <span className="text-sm text-neutral-500 font-normal italic tracking-tight">
                      {feature.notes}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </CardContent>
      </div>
    </Card>
  );
};

export default StorageServiceCard;