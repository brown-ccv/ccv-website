import {FormQuestions, SelectedAnswers, ServiceConfig,} from "@/lib/storage-types"

/**
 * Determines whether text should be white or black based on the background color
 * Uses WCAG contrast guidelines for accessibility
 *
 * @param {string} backgroundColor - The background color (CSS class or hex)
 * @returns {string} - 'text-white' or 'text-black'
 */
export const getTextColorForBackground = (backgroundColor: string): string => {
  const colorMap: Record<string, string> = {
    "bg-keppel-500": "text-black",
    "bg-keppel-600": "text-white",
    "bg-keppel-700": "text-white",
    "bg-sunglow-400": "text-black",
    "bg-sunglow-200": "text-black",
    "bg-red-university": "text-white",
    "bg-red-500": "text-white",
    "bg-red-600": "text-white",
    "bg-amber-600": "text-white",
    "bg-amber-500": "text-white",
    "bg-cyan-500": "text-white",
    "bg-purple-900": "text-white",
    "bg-purple-500": "text-white",
    "bg-blue-500": "text-white",
    "bg-blue-600": "text-white",
    "bg-pink-500": "text-white",
    "bg-neutral-800": "text-white",
    "bg-neutral-900": "text-white",
    "bg-neutral-200": "text-black",
    "bg-neutral-300": "text-black",
    "bg-neutral-400": "text-white",
    "bg-neutral-500": "text-white",
    "bg-neutral-600": "text-white",
    "bg-neutral-700": "text-white",
  }
  return colorMap[backgroundColor] || "text-black"
}

/**
 * Maps feature values to badge background colors based on the storage-types color map
 */
export const getBadgeBackgroundColor = (
  value: string | boolean | number
): string => {
  const stringValue = String(value).toLowerCase()
  const backgroundMap: Record<string, string> = {
    high: "bg-red-university",
    medium: "bg-amber-600",
    low: "bg-keppel-600",
    "0": "bg-keppel-600",
    "1": "bg-sunglow-400",
    "2": "bg-amber-600",
    "3": "bg-red-university",
    true: "bg-keppel-600",
    false: "bg-red-university",
    easy: "bg-keppel-600",
    complex: "bg-red-university",
    partial: "bg-sunglow-400",
    "low cost": "bg-keppel-600",
    "medium cost": "bg-sunglow-400",
    "high cost": "bg-red-university",
    hot: "bg-red-university",
    warm: "bg-sunglow-400",
    cold: "bg-cyan-500",
    fastest: "bg-keppel-600",
    faster: "bg-amber-600",
    fast: "bg-sunglow-400",
    slow: "bg-red-university",
    small: "bg-cyan-500",
    large: "bg-sunglow-400",
    "4 gb": "bg-red-university",
    "1 tb": "bg-amber-600",
    "1 tb +": "bg-sunglow-400",
    "2 tb +": "bg-sunglow-400",
    "4 tb": "bg-sunglow-400",
    "128 tb": "bg-sunglow-400",
    "8 eb": "bg-keppel-600",
    "9 eb": "bg-keppel-600",
    unlimited: "bg-keppel-600",
    default: "bg-neutral-200",
  }
  return backgroundMap[stringValue] || backgroundMap["default"]
}

/**
 * Gets the complete badge styling for a feature value
 */
export const getBadgeStyling = (value: string | boolean | number) => {
  const backgroundColor = getBadgeBackgroundColor(value)
  const textColor = getTextColorForBackground(backgroundColor)
  return {
    backgroundColor,
    textColor,
    className: `${backgroundColor} ${textColor}`,
  }
}

export const getDisabledState = (
  service: ServiceConfig,
  currentSelectedAnswers: SelectedAnswers,
  questions: FormQuestions[]
): boolean => {
  // service column is disabled if it fails *any* active filter condition.
  for (const id in currentSelectedAnswers) {
    if (currentSelectedAnswers.hasOwnProperty(id)) {
      const selectedAnswerValue = currentSelectedAnswers[id]

      const yamlQuestion = questions?.find((question) => question.id === id)

      if (!yamlQuestion) {
        continue // Skip this filter if question config is missing
      }
      const selectedYAMLAnswerOption = yamlQuestion.options.find(
        (answer) => answer.label === selectedAnswerValue
      )
      // selectedYAMLAnswerOption: { answer: 'No', matching_feature_values: [ true, false, 'partial' ] }
      if (!selectedYAMLAnswerOption) {
        continue // Skip this filter if selected answer option is missing
      }

      const allowedCategoryClasses = selectedYAMLAnswerOption.value

      const serviceFeature = service[id]

      // Determine if the selected answer implies a *strict requirement* for the feature.
      const nonStrictAnswers = [
        "no risk",
        "no",
        "any",
        "not sure",
        "less than 1 tb",
      ]
      const isStrictFilter = !nonStrictAnswers.includes(
        String(selectedAnswerValue).toLowerCase()
      )

      if (!serviceFeature) {
        // Case 1: Service does not have the feature
        if (isStrictFilter) {
          return true
        }
        continue
      }

      // Case 2: Service *does* have the feature, now check if its class matches the allowed classes.
      const serviceFeatureClassNormalized = String(
        serviceFeature.value
      ).toLowerCase()

      // Normalize the service's feature class (can be string, number, boolean) to a lowercase string
      const passesThisSpecificFilter = allowedCategoryClasses.some(
        (allowedClass: any) => {
          return (
            String(allowedClass).toLowerCase() === serviceFeatureClassNormalized
          )
        }
      )

      if (!passesThisSpecificFilter) {
        return true
      }
    }
  }
  return false
}
