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
    <div className="flex flex-wrap justify-center gap-4">
      {services.table_data.map((service, index) => (
        <StorageServiceCard
          key={index}
          service={service}
          isDisabled={getDisabledState(service, selectedAnswers, questions)}
        />
      ))}
    </div>
  )
}

export default StorageCards
