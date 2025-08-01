import React, { useMemo, useRef } from "react"
import { cn, humanize } from "@/lib/utils"
import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"
import Link from "next/link"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { Button } from "@/components/ui/Button"
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
import StorageServiceCard from "@/components/storage/StorageServiceCard"
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
          <div className="text-left px-[4vw] sm:px-[3vw] py-2 font-semibold text-neutral-700">
            Feature
          </div>
        ),
        cell: (info) => {
          const featureName = humanize(info.getValue())
          const IconComponent = featureIcons[info.getValue().toLowerCase()]
          return (
            <div className="flex items-center gap-2 px-[4vw] sm:px-[3vw] py-2 font-medium text-neutral-900 min-h-[80px] uppercase tracking-wider">
              {IconComponent ? (
                <IconComponent className="w-6 h-6 text-brown-700 flex-shrink-0" />
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
              href={`/services/storage#${service.name}`}
              className={cn(
                "flex flex-col items-start justify-start text-center px-2 py-2",
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
                    "flex flex-col items-center justify-center p-2 min-h-[80px]",
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
                  "flex flex-col items-center justify-center p-2 min-h-[80px]",
                  cellContentClasses
                )}
              >
                <div className={cn("flex gap-2 font-semibold text-xl")}>
                  {IconComponent ? (
                    <IconComponent
                      className={cn("w-6 h-6 flex-shrink-0", valueColor)}
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
                  <div className="text-sm text-neutral-500 mt-1 max-w-[300px] text-center tracking-tight">
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
      <div className="hidden lg:block w-full overflow-x-scroll rounded-2xl bg-gradient-to-br from-white to-neutral-50/30 border border-neutral-300">
        <div className="relative" ref={tableContainerRef}>
          <div className="flex justify-end p-2 border-b border-neutral-200 bg-white sticky top-0 z-40">
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
          className="overflow-x-scroll overflow-y-auto h-[calc(100vh-200px)]"
        >
          <table
            className="min-w-full border-separate"
            style={{ borderSpacing: 0 }}
          >
            <thead className="bg-white sticky top-0 z-20 border-b border-neutral-200">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header, index) => (
                    <th
                      key={header.id}
                      className={cn(
                        "px-2 py-3 text-left text-md font-medium text-neutral-500 uppercase tracking-wider min-w-[175px]",
                        header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : "",
                        index < headerGroup.headers.length - 1 &&
                          "border border-neutral-200",
                        "sticky top-0 bg-white border-b border-neutral-200",
                        header.id === "featureName" ? "z-30 left-0" : "z-20"
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
                          "border-y border border-neutral-200",
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
      <div className="lg:hidden w-full flex flex-col gap-4">
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
