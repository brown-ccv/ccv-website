import React, { useMemo } from "react"
import {
  SelectedAnswers,
  FormQuestions,
  StorageData,
} from "@/lib/storage-types"
import StorageServiceCard from "@/components/card/StorageServiceCard"
import {
  getDisabledState,
  getServicesRankedByMatch,
} from "@/components/storage/utils"

export interface TableProps {
  services: StorageData
  selectedAnswers: SelectedAnswers
  questions: FormQuestions[]
}

const StorageCards: React.FC<TableProps> = ({
  services,
  selectedAnswers,
  questions,
}) => {
  const { rankedServices, enabledCount } = useMemo(() => {
    const ranked = getServicesRankedByMatch(
      services.table_data,
      selectedAnswers,
      questions
    )

    // Count enabled services (those that are NOT disabled)
    const enabled = ranked.filter(
      (service) => !getDisabledState(service, selectedAnswers, questions)
    ).length

    return {
      rankedServices: ranked,
      enabledCount: enabled,
    }
  }, [services.table_data, selectedAnswers, questions])

  return (
    <div className="flex flex-col items-center lg:items-start">
      <div
        className="mt-4 text-sm text-gray-500"
        role="status"
        aria-live="polite"
        aria-label={`Showing ${enabledCount} matching services out of ${rankedServices.length} total services`}
      >
        <span className="sr-only">Search results: </span>
        Showing {enabledCount} of {rankedServices.length} service(s)
      </div>

      <div
        className="flex flex-wrap justify-center gap-4 lg:justify-start"
        role="list"
        aria-label="Storage services"
      >
        {rankedServices.map((service, index) => {
          const isDisabled = getDisabledState(
            service,
            selectedAnswers,
            questions
          )

          return (
            <div key={service.serviceName || index} role="listitem">
              <StorageServiceCard service={service} isDisabled={isDisabled} />
            </div>
          )
        })}
      </div>

      {enabledCount === 0 && rankedServices.length > 0 && (
        <div
          className="mt-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4"
          role="alert"
          aria-live="assertive"
        >
          <p className="text-sm text-yellow-800">
            <span className="font-medium">
              No services match your criteria.
            </span>{" "}
            Try adjusting your requirements to see more options.
          </p>
        </div>
      )}
    </div>
  )
}

export default React.memo(StorageCards)
