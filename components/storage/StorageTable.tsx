import React, { useMemo, useRef } from "react"
import { cn, humanize } from "@/lib/utils"
import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"
import Link from "next/link"
import { Button } from "@/components/button/Button"
import { ChevronRightIcon, ChevronLeftIcon } from "lucide-react"
import {
  ServiceConfig,
  SelectedAnswers,
  TableRow,
  QuestionsConfig,
  ServiceFeature,
  featureIcons,
  featureColorMap,
} from "@/lib/storage-types"
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
} from "@tanstack/react-table"
import StorageServiceCard from "@/components/card/StorageServiceCard"
import {
  getAllUniqueFeatureNames,
  sortFeatures,
} from "@/components/storage/utils"

export interface TableProps {
  services: ServiceConfig[]
  selectedAnswers: SelectedAnswers
  questions: QuestionsConfig[]
}

// --- Core Filtering Logic ---
const getColumnDisabledState = (
  service: ServiceConfig,
  currentSelectedAnswers: SelectedAnswers,
  questions: QuestionsConfig[]
): boolean => {
  // service column is disabled if it fails *any* active filter condition.
  for (const questionId in currentSelectedAnswers) {
    if (currentSelectedAnswers.hasOwnProperty(questionId)) {
      const selectedAnswerValue = currentSelectedAnswers[questionId]

      const yamlQuestion = questions?.find(
        (question) => question.affected_feature === questionId
      )
      if (!yamlQuestion) {
        continue // Skip this filter if question config is missing
      }

      const selectedYAMLAnswerOption = yamlQuestion.answers.find(
        (answer) => answer.answer === selectedAnswerValue
      )
      if (!selectedYAMLAnswerOption) {
        continue // Skip this filter if selected answer option is missing
      }

      const allowedCategoryClasses =
        selectedYAMLAnswerOption.matching_feature_values

      const serviceFeature = service.features?.find(
        (f) => f.name === questionId
      )

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
        (allowedClass) => {
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

// --- Main Table Component ---
const Table: React.FC<TableProps> = ({
  services,
  selectedAnswers,
  questions,
}) => {
  const columnHelper = createColumnHelper<TableRow>()
  const tableContainerRef = useRef<HTMLDivElement>(null)

  const tableData: TableRow[] = useMemo(() => {
    // Filter services to only include those with at least one feature
    const servicesWithFeatures = services.filter(
      (service) => service.features && service.features.length > 0
    )

    // Use shared utility to get all unique feature names
    const featureNames = getAllUniqueFeatureNames(servicesWithFeatures)
    // Use improved sortFeatures utility
    const orderedFeatureNames = sortFeatures(featureNames, questions)

    return orderedFeatureNames.map((featureName) => {
      const row: TableRow = { featureName: featureName }
      servicesWithFeatures.forEach((service) => {
        row[service.name] = service.features?.find(
          (f) => f.name === featureName
        )
      })
      return row
    })
  }, [services, questions])

  // 2. define columns for TanStack Table (memoized for performance)
  const columns = useMemo<ColumnDef<TableRow, any>[]>(() => {
    // Filter services to only include those with at least one feature
    const servicesWithFeatures = services.filter(
      (service) => service.features && service.features.length > 0
    )

    const featureNameColumn: ColumnDef<TableRow, any> = columnHelper.accessor(
      "featureName",
      {
        id: "featureName",
        header: () => (
          <div className="px-[4vw] py-2 text-left font-semibold text-neutral-700 sm:px-[3vw]">
            Feature
          </div>
        ),
        cell: (info) => {
          const featureName = humanize(info.getValue())
          const IconComponent = featureIcons[info.getValue().toLowerCase()]
          return (
            <div className="flex min-h-[80px] items-center gap-2 px-[4vw] py-2 font-medium uppercase tracking-wider text-neutral-900 sm:px-[3vw]">
              {IconComponent ? (
                <IconComponent className="text-brown-700 h-6 w-6 flex-shrink-0" />
              ) : null}
              <span>{featureName}</span>
            </div>
          )
        },
        enableColumnFilter: false,
        size: 200,
      }
    )

    const serviceColumns: ColumnDef<TableRow, any>[] = servicesWithFeatures.map(
      (service) => {
        // Determine if the *entire service column* should be disabled (grayed out)
        const isDisabled = getColumnDisabledState(
          service,
          selectedAnswers,
          questions
        )
        const columnClass = isDisabled ? "opacity-30 grayscale" : ""

        return columnHelper.accessor(service.name, {
          id: service.name,
          header: () => (
            <Link
              href={`/services/storage#${service.id}`}
              className={cn(
                "flex flex-col items-start justify-start px-2 py-2 text-center",
                columnClass
              )}
            >
              <div className="font-semibold">{humanize(service.name)}</div>
            </Link>
          ),
          cell: (info) => {
            const feature = info.getValue() as ServiceFeature
            const featureNameFromRow = info.row.original.featureName
            const cellContentClasses = cn(
              "px-[4vw] sm:px-[3vw] py-2 text-start",
              columnClass
            )

            if (feature === undefined) {
              return (
                <div
                  className={cn(
                    "flex min-h-[80px] flex-col items-center justify-center p-2",
                    cellContentClasses
                  )}
                >
                  <span className="text-neutral-400 text-3xl">-</span>
                </div>
              )
            }

            const featureClassLower = String(feature?.value).toLowerCase()
            const IconComponent = featureIcons[featureNameFromRow.toLowerCase()]
            const valueColor =
              featureColorMap[featureClassLower] || featureColorMap["default"]

            return (
              <div
                className={cn(
                  "flex min-h-[80px] flex-col items-center justify-center p-2",
                  cellContentClasses
                )}
              >
                <div className={cn("flex gap-2 text-xl font-semibold")}>
                  {IconComponent ? (
                    <IconComponent
                      className={cn("h-6 w-6 flex-shrink-0", valueColor)}
                    />
                  ) : null}
                  <span>
                    {(() => {
                      const featureClassValue = feature?.value
                      if (typeof featureClassValue === "boolean") {
                        return featureClassValue ? "Yes" : "No"
                      }
                      if (
                        featureNameFromRow === "security" &&
                        typeof featureClassValue === "number"
                      ) {
                        return `Level ${featureClassValue}`
                      }
                      if (
                        featureNameFromRow === "storage" &&
                        typeof featureClassValue === "string"
                      ) {
                        if (featureClassValue.includes("TB +")) {
                          return featureClassValue
                        }
                        if (featureClassValue.includes("TB")) {
                          return featureClassValue
                        }
                      }
                      return humanize(String(featureClassValue))
                    })()}
                  </span>
                </div>
                {feature?.notes && (
                  <div className="mt-1 max-w-[300px] text-center text-sm tracking-tight text-neutral-500">
                    <Markdown
                      rehypePlugins={[rehypeRaw]}
                      remarkPlugins={[remarkGfm]}
                    >
                      {String(feature.notes ?? "")}
                    </Markdown>
                  </div>
                )}
              </div>
            )
          },
          enableColumnFilter: false,
          size: 150,
        })
      }
    )

    return [featureNameColumn, ...serviceColumns]
  }, [columnHelper, services, selectedAnswers, questions])

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    defaultColumn: {
      minSize: 100,
      maxSize: 300,
      size: 200,
    },
  })

  const scrollTable = (direction: "left" | "right") => {
    if (tableContainerRef.current) {
      const scrollAmount = 300
      tableContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <>
      {/* Desktop View - Table */}
      <div className="hidden w-full overflow-x-scroll rounded-2xl border border-neutral-300 bg-gradient-to-br from-white to-neutral-50/30 lg:block">
        <div className="relative" ref={tableContainerRef}>
          <div className="sticky top-0 z-40 flex justify-end border-b border-neutral-200 bg-white p-2">
            <Button
              onClick={() => scrollTable("left")}
              aria-label="Scroll left"
              variant="secondary_filled"
              iconOnly={
                <ChevronLeftIcon className="h-6 w-6" strokeWidth={2.5} />
              }
            />
            <Button
              onClick={() => scrollTable("right")}
              aria-label="Scroll right"
              variant="secondary_filled"
              iconOnly={
                <ChevronRightIcon className="h-6 w-6" strokeWidth={2.5} />
              }
            />
          </div>
        </div>
        <div
          ref={tableContainerRef}
          className="h-[calc(100vh-200px)] overflow-y-auto overflow-x-scroll"
        >
          <table
            className="min-w-full border-separate"
            style={{ borderSpacing: 0 }}
          >
            <thead className="sticky top-0 z-20 border-b border-neutral-200 bg-white">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header, index) => (
                    <th
                      key={header.id}
                      className={cn(
                        "min-w-[175px] px-2 py-3 text-left text-md font-medium uppercase tracking-wider text-neutral-500",
                        header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : "",
                        index < headerGroup.headers.length - 1 &&
                          "border border-neutral-200",
                        "sticky top-0 border-b border-neutral-200 bg-white",
                        header.id === "featureName" ? "left-0 z-30" : "z-20"
                      )}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell, index) => (
                    <td
                      key={cell.id}
                      className={cn(
                        index < row.getVisibleCells().length &&
                          "border border-y border-neutral-200",
                        cell.column.id === "featureName" &&
                          "sticky left-0 z-10 bg-white"
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile View - Cards */}
      <div className="flex w-full flex-col items-center gap-4 lg:hidden">
        {services
          .filter((service) => service.features && service.features.length > 0)
          .map((service) => (
            <StorageServiceCard
              key={service.name}
              service={service}
              isDisabled={getColumnDisabledState(
                service,
                selectedAnswers,
                questions
              )}
            />
          ))}
      </div>
    </>
  )
}

export default Table
