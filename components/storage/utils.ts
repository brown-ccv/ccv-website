import { ServiceConfig } from '@/lib/storage-types';

/**
 * Extracts all unique feature names from an array of services.
 * @param services Array of ServiceConfig objects
 * @returns Array of unique feature names (strings)
 */
export function getAllUniqueFeatureNames(services: ServiceConfig[]): string[] {
  const uniqueFeatureNames = new Set<string>();
  services.forEach(service => {
    service.features?.forEach(feature => {
      uniqueFeatureNames.add(feature.name);
    });
  });
  return Array.from(uniqueFeatureNames);
}

/**
 * Sorts features or feature names according to the order in questionsConfig, then alphabetically.
 * Accepts an array of features ({ name: string }) or feature names (string[]), and a questionsConfig array.
 * @template T - Either { name: string } or string
 * @param features Array of features or feature names
 * @param questionsConfig Array of question configs with affected_feature
 * @returns Sorted array of features or feature names
 */
export function sortFeatures<T extends { name: string } | string>(
  features: T[],
  questionsConfig: { affected_feature: string }[]
): T[] {
  if (!features) return [];
  if (!questionsConfig) {
    return features.slice().sort((a, b) => {
      const aName = typeof a === 'string' ? a : a.name;
      const bName = typeof b === 'string' ? b : b.name;
      return aName.localeCompare(bName);
    });
  }
  const questionOrder = questionsConfig.map(q => q.affected_feature);
  return features.slice().sort((a, b) => {
    const aName = typeof a === 'string' ? a : a.name;
    const bName = typeof b === 'string' ? b : b.name;
    const aIndex = questionOrder.indexOf(aName);
    const bIndex = questionOrder.indexOf(bName);
    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    return aName.localeCompare(bName);
  });
} 