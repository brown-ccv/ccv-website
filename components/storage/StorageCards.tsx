import React from "react"
import {
  SelectedAnswers,
  FormQuestions,
  StorageData,
} from "@/lib/storage-types"
import StorageServiceCard from "@/components/card/StorageServiceCard"
import { getDisabledState } from "@/components/storage/utils"

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
  return (
    <div className="flex flex-col items-center lg:items-start">
      <p className="mb-4 text-sm text-gray-500">
        Showing {} matching service(s)
      </p>
      <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
        {services.table_data.map((service, index) => (
          <StorageServiceCard
            key={index}
            service={service}
            isDisabled={getDisabledState(service, selectedAnswers, questions)}
          />
        ))}
      </div>
    </div>
  )
}

export default StorageCards
