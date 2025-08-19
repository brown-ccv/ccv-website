import React from "react"
import {
  ServiceConfig,
  SelectedAnswers,
  QuestionsConfig,
} from "@/lib/storage-types"
import StorageServiceCard from "@/components/card/StorageServiceCard"
import { getDisabledState } from "@/components/storage/utils"

export interface TableProps {
  services: ServiceConfig[]
  selectedAnswers: SelectedAnswers
  questions: QuestionsConfig[]
}

const StorageCards: React.FC<TableProps> = ({
  services,
  selectedAnswers,
  questions,
}) => {
  return (
    <div className="flex w-full flex-col items-center gap-4 lg:hidden">
      {services
        .filter((service) => service.features && service.features.length > 0)
        .map((service) => (
          <StorageServiceCard
            key={service.name}
            service={service}
            isDisabled={getDisabledState(service, selectedAnswers, questions)}
          />
        ))}
    </div>
  )
}

export default StorageCards
