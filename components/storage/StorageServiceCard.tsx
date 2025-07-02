// src/components/ui/ServiceCard.tsx
import React from 'react';
import { ServiceConfig, QuestionsConfig, SelectedAnswers, ServiceFeature, featureIcons, featureColorMap } from '@/lib/storage-types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { cn, humanize } from "@/lib/utils"

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

  // Helper to sort features according to question order, then alphabetically
  const sortFeatures = (features: ServiceFeature[]): ServiceFeature[] => {
    // Get the question order dynamically from questionsConfig
    const questionOrder = questionsConfig.map(q => q.affected_feature);

    return [...features].sort((a, b) => {
      const aIndex = questionOrder.indexOf(a.name);
      const bIndex = questionOrder.indexOf(b.name);
      
      // If both features are in the question order, sort by their position
      if (aIndex !== -1 && bIndex !== -1) {
        return aIndex - bIndex;
      }
      
      // If only one feature is in the question order, prioritize it
      if (aIndex !== -1 && bIndex === -1) {
        return -1;
      }
      if (aIndex === -1 && bIndex !== -1) {
        return 1;
      }
      
      // If neither feature is in the question order, sort alphabetically
      return a.name.localeCompare(b.name);
    });
  };

  return (
    <Card className={cn("w-full bg-white")}>
      <div className={cn("transition-opacity duration-300", isDisabled ? 'opacity-30 grayscale' : '')}>
        <CardHeader className="flex items-center justify-center">
          <CardTitle className="text-2xl pt-4">{humanize(service.name)}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-lg mx-6 mb-4">
          {sortFeatures(service.features || []).map((feature) => {
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