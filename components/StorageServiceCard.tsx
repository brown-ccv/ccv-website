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

const StorageServiceCard: React.FC<ServiceCardProps> = ({ service, questionsConfig, selectedAnswers, isDisabled }) => {

  // Helper to determine if a service feature's class matches the current selected answer
  // const matchesSelectedAnswer = (featureName: string, featureClass: string | boolean | number): boolean => {
  //   const selectedValue = selectedAnswers[featureName];
  //   if (!selectedValue) {
  //     return true; // No filter for this feature, so it matches
  //   }

  //   const questionConfig = questionsConfig.find(question => question.affected_feature === featureName);
  //   if (!questionConfig) {
  //     return true; // No question config for this feature, cannot filter, so consider it a match
  //   }

  //   const selectedAnswerOption = questionConfig.answers.find(ans => ans.answer === selectedValue);
  //   if (!selectedAnswerOption) {
  //     return true; // Selected answer option not found, cannot filter, so consider it a match
  //   }

  //   const serviceFeatureClassNormalized = String(featureClass).toLowerCase();

  //   // Check if the service's feature class matches any of the allowed categories for the selected answer
  //   return selectedAnswerOption.matching_feature_values.some(allowedValue =>
  //     String(allowedValue).toLowerCase() === serviceFeatureClassNormalized
  //   );
  // };

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
          {service.features?.map((feature) => {

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