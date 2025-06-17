// src/components/ui/ServiceCard.tsx
import React from 'react';
import { YAMLServiceConfig, YAMLQuestionConfig, SelectedAnswers, ServiceFeature } from '@/lib/storage-types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { cn, humanize } from "@/lib/utils"

// --- Import Icons ---
import {
    FaThermometerHalf,
    FaDollarSign,
    FaShareSquare,
    FaHdd,
    FaWifi,
    FaExchangeAlt,
    FaShieldAlt
  } from 'react-icons/fa';
  import { FaFile } from "react-icons/fa6";
  import { SlSpeedometer } from "react-icons/sl";
  import { MdSdStorage } from "react-icons/md";
  import { AiOutlineCluster } from "react-icons/ai";
  import { SiDoi } from "react-icons/si";
  import { SiCanvas } from "react-icons/si";
  import { LuDatabaseBackup } from "react-icons/lu";
  
  // --- Helper Mappings for Icons and Colors ---
  const FeatureIcons: Record<string, React.ElementType> = {
    'relative_speed': SlSpeedometer,
    'security': FaShieldAlt,
    'cost': FaDollarSign,
    'sharing': FaShareSquare,
    'capacity': FaHdd,
    'doi_provided': SiDoi,
    'data_protection': LuDatabaseBackup,
    'secondary_site_backup': LuDatabaseBackup,
    'canvas_integration': SiCanvas,
    'brown_network_required': FaWifi,
    'access_from_oscar': AiOutlineCluster,
    'storage_warmth': FaThermometerHalf,
    'collaborative_edits': FaExchangeAlt,
    'shareable_link': FaShareSquare,
    'max_file_size': FaFile,
    'storage': MdSdStorage,
  };
  
  const ClassColors: Record<string, string> = {
    'high': 'text-red-university', 'medium': 'text-amber-600', 'low': 'text-keppel-600',
    '0': 'text-keppel-600', '1': 'text-sunglow-400', '2': 'text-amber-600', '3': 'text-red-university',
    'true': 'text-keppel-600', 'false': 'text-red-university',
    'easy': 'text-keppel-600', 'complex': 'text-red-university', 'partial': 'text-sunglow-400',
  
    'low cost': 'text-keppel-600', 'medium cost': 'text-sunglow-400', 'high cost': 'text-red-university',
  
    'hot': 'text-red-university', 'warm': 'text-sunglow-400', 'cold': 'text-cyan-500',
    'fastest': 'text-keppel-600', 'faster': 'text-amber-600', 'fast': 'text-sunglow-400', 'slow': 'text-red-university',
  
    'small': 'text-cyan-500', 'large': 'text-sunglow-400',
    '4 gb': 'text-red-university', '1 tb': 'text-amber-600',
    '1 tb +': 'text-sunglow-400', '2 tb +': 'text-sunglow-400', '4 tb': 'text-sunglow-400', '128 tb': 'text-sunglow-400',
    '8 eb': 'text-keppel-600', '9 eb': 'text-keppel-600', 'unlimited': 'text-keppel-600',
  
    'default': 'text-neutral-800',
  };

interface ServiceCardProps {
    service: YAMLServiceConfig;
    yamlQuestionsConfig: YAMLQuestionConfig[];
    selectedAnswers: SelectedAnswers;
    isDisabled: boolean;
  }

const ServiceCard: React.FC<ServiceCardProps> = ({ service, yamlQuestionsConfig, selectedAnswers, isDisabled }) => {

  // Helper to determine if a service feature's class matches the current selected answer
  const matchesSelectedAnswer = (featureName: string, featureClass: string | boolean | number): boolean => {
    const selectedValue = selectedAnswers[featureName];
    if (!selectedValue) {
      return true; // No filter for this feature, so it matches
    }

    const questionConfig = yamlQuestionsConfig.find(q => q.affected_category === featureName);
    if (!questionConfig) {
      return true; // No question config for this feature, cannot filter, so consider it a match
    }

    const selectedYAMLAnswerOption = questionConfig.answers.find(ans => ans.answer === selectedValue);
    if (!selectedYAMLAnswerOption) {
      return true; // Selected answer option not found, cannot filter, so consider it a match
    }

    const serviceFeatureClassNormalized = String(featureClass).toLowerCase();

    // Check if the service's feature class matches any of the allowed categories for the selected answer
    return selectedYAMLAnswerOption.category_classes.some(allowedClass =>
      String(allowedClass).toLowerCase() === serviceFeatureClassNormalized
    );
  };

  // Helper to format the display value of a feature class
  const formatFeatureDisplayValue = (feature: ServiceFeature): string => {
    if (typeof feature.class === 'boolean') {
      return feature.class ? 'Yes' : 'No';
    }
    if (feature.name === 'security' && typeof feature.class === 'number') {
      return `Level ${feature.class}`;
    }
    return String(feature.class);
  };


  return (
    <Card className={cn("w-full bg-white")}>
        <div className={cn("transition-opacity duration-300", isDisabled ? 'opacity-30 grayscale' : '')}>
            <CardHeader className="flex items-center justify-center">
                <CardTitle className="text-2xl pt-4">{humanize(service.name)}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-lg mx-6 mb-4">
                {service.features.map((feature) => {

                const IconComponent = FeatureIcons[feature.name.toLowerCase()];
                const featureClassLower = String(feature.class).toLowerCase();
                const valueColor = ClassColors[featureClassLower] || ClassColors['default'];

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
                            ({feature.notes})
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

export default ServiceCard;