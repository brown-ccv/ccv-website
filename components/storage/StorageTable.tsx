import React, { CSSProperties, useMemo, useRef, useState } from "react"
import { cn, humanize } from "@/lib/utils"
import Link from "next/link"
import { ChevronRightIcon, ChevronLeftIcon } from "lucide-react"
import {
  ServiceConfig,
  StorageData,
  ServiceFeature,
  featureColorMap,
} from "@/lib/storage-types"
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  ColumnPinningState,
  getSortedRowModel,
  getFilteredRowModel,
  Row,
  RowPinningState,
  Table,
  Column,
} from "@tanstack/react-table"
import { Button } from "@/components/button/Button"
import Icon from "@/components/ui/RenderIcon"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip"

export interface TableProps {
  services: StorageData
}

interface FeatureCellProps {
  feature: ServiceFeature
  colorClass: string
  iconName: string
}

const getCommonPinningStyles = (
  column: Column<ServiceConfig>
): CSSProperties => {
  const isPinned = column.getIsPinned()
  const isLastLeftPinnedColumn =
    isPinned === "left" && column.getIsLastColumn("left")

  return {
    boxShadow: isLastLeftPinnedColumn
      ? "-4px 0 4px -4px gray inset"
      : undefined,
    left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
    position: isPinned ? "sticky" : "relative",
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0,
  }
}

function PinnedRow({ row, table }: { row: Row<any>; table: Table<any> }) {
  return (
    <tr
      style={{
        position: "sticky",
        top:
          row.getIsPinned() === "top"
            ? `${row.getPinnedIndex() * 26 + 48}px`
            : undefined,
      }}
    >
      {row.getVisibleCells().map((cell) => {
        const { column } = cell
        return (
          <td
            key={cell.id}
            style={{ ...getCommonPinningStyles(column) }}
            className="border-r border-slate-200 bg-neutral-100 px-4 py-4 text-sm"
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        )
      })}
    </tr>
  )
}

const StorageTable: React.FC<TableProps> = ({ services }) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
    left: ["pin", "serviceName"],
    right: [],
  })
  const [rowPinning, setRowPinning] = React.useState<RowPinningState>({
    top: [],
    bottom: [],
  })
  const columnHelper = createColumnHelper<ServiceConfig>()
  const tableContainerRef = useRef<HTMLDivElement>(null)

  const tableData = services.table_data
  const featureNames = services.metadata.feature_names
  const featureMetadata = services.metadata.feature_metadata

  const FeatureCell: React.FC<FeatureCellProps> = ({
    feature,
    colorClass,
    iconName,
  }) => {
    if (feature.notes) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="group flex gap-2">
              <div className="flex items-center gap-2">
                <Icon
                  iconName={iconName}
                  className={cn("h-4 w-4 flex-shrink-0", colorClass)}
                />
                <span className="font-medium uppercase tracking-wider">
                  {String(feature.value)}
                </span>
              </div>
              <Icon
                iconName="FaInfoCircle"
                className="h-3 w-3 group-hover:text-keppel-600"
              />
            </TooltipTrigger>
            <TooltipContent className="rounded-md border bg-white shadow">
              {feature.notes.map((note, index) => (
                <p key={index}>{note}</p>
              ))}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }
    return (
      <div className="flex items-center gap-2 font-medium uppercase tracking-wider">
        <Icon
          iconName={iconName}
          className={cn("h-4 w-4 flex-shrink-0", colorClass)}
        />
        <span>{String(feature.value)}</span>
      </div>
    )
  }

  // 2. define columns for TanStack Table (memoized for performance)
  const columns = useMemo<ColumnDef<ServiceConfig, any>[]>(() => {
    const pinColumn = {
      id: "pin",
      header: () => "Pin Service",
      cell: ({ row }: { row: Row<ServiceConfig> }) =>
        row.getIsPinned() ? (
          <Button
            variant="icon_only"
            size="icon-sm"
            className="border border-black"
            iconOnly={<Icon iconName="FaTimes" className="h-3 w-3" />}
            onClick={() => row.pin(false)}
          ></Button>
        ) : (
          <div className="flex gap-1">
            <Button
              variant="icon_only"
              size="icon-sm"
              className="border border-black"
              aria-label="Pin Column"
              iconOnly={<Icon iconName="FaThumbtack" className="h-3 w-3" />}
              onClick={() => row.pin("top")}
            ></Button>
          </div>
        ),
      enablePinning: false,
      enableSorting: false,
      size: 52,
      minSize: 52,
      maxSize: 52,
    }
    const serviceColumn = columnHelper.accessor("serviceName", {
      header: "Service",
      cell: (info) => (
        <Link
          href={info.row.original.documentation}
          className={cn(
            "font-medium text-keppel-800 transition-colors hover:text-keppel-600 focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunglow-400"
          )}
        >
          {humanize(info.getValue())}
        </Link>
      ),
      enablePinning: false,
    })

    const featureColumns = featureNames.map((featureName) => {
      const metadata = featureMetadata[featureName]

      return columnHelper.accessor(
        (row: ServiceConfig) => {
          const feature = row[featureName] as ServiceFeature
          return feature?.sortValue ?? feature?.value
        },
        {
          id: featureName,
          header: () => (
            <div className="flex items-center justify-center gap-2.5">
              <Icon
                iconName={metadata?.icon}
                className="h-4 w-4 flex-shrink-0"
              />
              <p className="text-sm font-medium uppercase">
                {metadata.display_name}
              </p>
            </div>
          ),
          cell: (info) => {
            const feature = info.row.original[featureName] as ServiceFeature
            const value = String(feature.value).toLowerCase()
            const colorClass = featureColorMap[value] || featureColorMap.default
            return (
              <FeatureCell
                feature={feature}
                colorClass={colorClass}
                iconName={metadata?.icon}
              />
            )
          },
          size: 175,
        }
      )
    })

    return [pinColumn, serviceColumn, ...featureColumns]
  }, [featureNames, featureMetadata, columnHelper])

  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      sorting,
      columnFilters,
      columnPinning,
      rowPinning,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnPinningChange: setColumnPinning,
    onRowPinningChange: setRowPinning,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
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
      <div className="mb-4 flex justify-end space-x-2">
        <Button
          onClick={() => scrollTable("left")}
          aria-label="Scroll left"
          variant="secondary_filled"
          iconOnly={<ChevronLeftIcon className="h-6 w-6" strokeWidth={2.5} />}
        />
        <Button
          onClick={() => scrollTable("right")}
          aria-label="Scroll right"
          variant="secondary_filled"
          iconOnly={<ChevronRightIcon className="h-6 w-6" strokeWidth={2.5} />}
        />
      </div>

      <div
        ref={tableContainerRef}
        className="overflow-auto rounded-lg border border-slate-200 bg-white"
      >
        <table className="not-prose min-w-full divide-y divide-stone-500">
          <thead className="sticky top-0 z-20 shadow-sm">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const { column } = header
                  if (header.column.id === "pin") {
                    return (
                      <th
                        key={header.id}
                        className="w-12 bg-neutral-900 px-4 py-3"
                        style={{ ...getCommonPinningStyles(column) }}
                      ></th>
                    )
                  }
                  return (
                    <th
                      key={header.id}
                      className={cn(
                        "min-w-56 cursor-pointer border-r border-stone-500 bg-neutral-900 px-4 py-3 text-left font-medium uppercase tracking-wider text-white last:border-r-0 hover:bg-neutral-500"
                      )}
                      style={{ ...getCommonPinningStyles(column) }}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center justify-between gap-5">
                        {!header.isPlaceholder && header.column.getCanPin() && (
                          <div className="pb-2">
                            {header.column.getIsPinned() !== "left" ? (
                              <Button
                                variant="icon_only"
                                size="icon-sm"
                                className="border border-white"
                                aria-label="Pin Column"
                                iconOnly={
                                  <Icon
                                    iconName="FaThumbtack"
                                    className="h-3 w-3"
                                  />
                                }
                                onClick={(event) => {
                                  event.stopPropagation()
                                  header.column.pin("left")
                                }}
                              ></Button>
                            ) : null}
                            {header.column.getIsPinned() ? (
                              <Button
                                variant="icon_only"
                                size="icon-sm"
                                className="border border-white"
                                iconOnly={
                                  <Icon
                                    iconName="FaTimes"
                                    className="h-3 w-3"
                                  />
                                }
                                onClick={(event) => {
                                  event.stopPropagation()
                                  header.column.pin(false)
                                }}
                              ></Button>
                            ) : null}
                          </div>
                        )}
                        <div className="flex items-center gap-4">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {header.column.getCanSort() && (
                            <span>
                              {{
                                asc: (
                                  <Icon
                                    iconName="FaSortUp"
                                    className="h-4 w-4"
                                  />
                                ),
                                desc: (
                                  <Icon
                                    iconName="FaSortDown"
                                    className="h-4 w-4"
                                  />
                                ),
                              }[header.column.getIsSorted() as string] ?? (
                                <Icon iconName="FaSort" className="h-4 w-4" />
                              )}
                            </span>
                          )}
                        </div>
                      </div>
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {table.getTopRows().map((row) => (
              <PinnedRow key={row.id} row={row} table={table} />
            ))}
            {table.getCenterRows().map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  const { column } = cell
                  return (
                    <td
                      key={cell.id}
                      className={cn(
                        "border-r border-slate-200 bg-white px-4 py-4 text-sm"
                      )}
                      style={{ ...getCommonPinningStyles(column) }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-sm text-slate-500">
        Showing {table.getRowModel().rows.length} service(s)
      </p>
    </>
  )
}

export default StorageTable
