import {
  FormQuestions,
  SelectedAnswers,
  ServiceConfig,
} from "@/lib/storage-types"

export const getDisabledState = (
  service: ServiceConfig,
  currentSelectedAnswers: SelectedAnswers,
  questions: FormQuestions[]
): boolean => {
  // service column is disabled if it fails *any* active filter condition.
  for (const id in currentSelectedAnswers) {
    if (currentSelectedAnswers.hasOwnProperty(id)) {
      const selectedAnswerValue = currentSelectedAnswers[id]

      const matchingQuestion = questions?.find((question) => question.id === id)

      if (!matchingQuestion) {
        continue // Skip this filter if question config is missing
      }
      const selectedAnswerOption = matchingQuestion.options.find(
        (answer) => answer.label === selectedAnswerValue
      )
      // selectedAnswerOption: { answer: 'No', matching_feature_values: [ true, false, 'partial' ] }
      if (!selectedAnswerOption) {
        continue // Skip this filter if selected answer option is missing
      }

      const allowedCategoryClasses = selectedAnswerOption.value

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
