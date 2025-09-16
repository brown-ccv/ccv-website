import {FormQuestions, SelectedAnswers, ServiceConfig,} from "@/lib/storage-types"

/**
 * Returns an array of services that match the selected answers
 * @param services - Array of all available services
 * @param currentSelectedAnswers - Object containing the user's selected answers
 * @param questions - Array of question configurations
 * @returns Array of services that match all the selected criteria
 */
export const getMatchingServices = (
  services: ServiceConfig[],
  currentSelectedAnswers: SelectedAnswers,
  questions: FormQuestions[]
): ServiceConfig[] => {
  return services.filter(
    (service) => !getDisabledState(service, currentSelectedAnswers, questions)
  )
}

/**
 * Updated getDisabledState function with improved logic and type safety
 * Returns true if the service should be disabled (doesn't match criteria)
 */
export const getDisabledState = (
  service: ServiceConfig,
  currentSelectedAnswers: SelectedAnswers,
  questions: FormQuestions[]
): boolean => {
  // Service is disabled if it fails *any* active filter condition
  for (const id in currentSelectedAnswers) {
    if (!currentSelectedAnswers.hasOwnProperty(id)) {
      continue
    }

    const selectedAnswerValue = currentSelectedAnswers[id]

    // Skip if no answer is selected
    if (!selectedAnswerValue) {
      continue
    }

    const matchingQuestion = questions?.find((question) => question.id === id)

    if (!matchingQuestion) {
      continue // Skip this filter if question config is missing
    }

    const selectedAnswerOption = matchingQuestion.options.find(
      (answer) => answer.label === selectedAnswerValue
    )

    if (!selectedAnswerOption) {
      continue // Skip this filter if selected answer option is missing
    }

    const allowedCategoryClasses = selectedAnswerOption.value
    const serviceFeature = service[id]

    // Determine if the selected answer implies a *strict requirement* for the feature
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
        return true // Service is disabled because it lacks a required feature
      }
      continue
    }

    // Case 2: Service *does* have the feature, check if its value matches allowed values
    const serviceFeatureValue = serviceFeature.value

    // Handle different data types (string, number, boolean)
    const serviceFeatureNormalized = String(serviceFeatureValue).toLowerCase()

    const passesThisFilter = allowedCategoryClasses.some(
      (allowedClass: any) => {
        const allowedClassNormalized = String(allowedClass).toLowerCase()
        return allowedClassNormalized === serviceFeatureNormalized
      }
    )

    if (!passesThisFilter) {
      return true // Service is disabled because feature value doesn't match criteria
    }
  }

  return false // Service passes all filters
}

/**
 * Alternative function that returns matching services with additional metadata
 */
export const getMatchingServicesWithDetails = (
  services: ServiceConfig[],
  currentSelectedAnswers: SelectedAnswers,
  questions: FormQuestions[]
): {
  matchingServices: ServiceConfig[]
  totalServices: number
  matchCount: number
} => {
  const matchingServices = getMatchingServices(
    services,
    currentSelectedAnswers,
    questions
  )

  return {
    matchingServices,
    totalServices: services.length,
    matchCount: matchingServices.length,
  }
}

/**
 * Utility function to get services sorted by how well they match criteria
 * Services that match more criteria appear first
 * Uses the same logic as getDisabledState for consistency
 */
export const getServicesRankedByMatch = (
  services: ServiceConfig[],
  currentSelectedAnswers: SelectedAnswers,
  questions: FormQuestions[]
): Array<ServiceConfig & { matchScore: number }> => {
  return services
    .map((service) => {
      let matchScore = 0
      let totalCriteria = 0

      for (const id in currentSelectedAnswers) {
        if (
          !currentSelectedAnswers.hasOwnProperty(id) ||
          !currentSelectedAnswers[id]
        ) {
          continue
        }

        const selectedAnswerValue = currentSelectedAnswers[id]
        const matchingQuestion = questions?.find(
          (question) => question.id === id
        )

        if (!matchingQuestion) continue

        const selectedAnswerOption = matchingQuestion.options.find(
          (answer) => answer.label === selectedAnswerValue
        )

        if (!selectedAnswerOption) continue

        totalCriteria++

        const allowedCategoryClasses = selectedAnswerOption.value
        const serviceFeature = service[id]

        // Determine if this is a strict filter (same logic as getDisabledState)
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
          // If service lacks the feature but it's not strictly required, give partial credit
          if (!isStrictFilter) {
            matchScore += 0.5
          }
          // If strictly required and missing, matchScore += 0 (no credit)
          continue
        }

        // Service has the feature - check if value matches
        const serviceFeatureNormalized = String(serviceFeature.value)
          .toLowerCase()
          .trim()
        const matches = allowedCategoryClasses.some((allowedClass: any) => {
          const allowedClassNormalized = String(allowedClass)
            .toLowerCase()
            .trim()
          return allowedClassNormalized === serviceFeatureNormalized
        })

        if (matches) {
          matchScore += 1
        }
      }

      return {
        ...service,
        matchScore: totalCriteria > 0 ? matchScore / totalCriteria : 1,
      }
    })
    .sort((a, b) => {
      // Sort by match score (descending), then by service name for consistency
      if (b.matchScore !== a.matchScore) {
        return b.matchScore - a.matchScore
      }
      return (a.serviceName || "").localeCompare(b.serviceName || "")
    })
}
