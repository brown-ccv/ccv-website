import React, { useMemo, useRef, useState } from "react"
import { cn, humanize } from "@/lib/utils"
import Link from "next/link"
import { ChevronRightIcon, ChevronLeftIcon } from "lucide-react"
import {
  TableRow,
  StorageData,
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
  SortingState,
  ColumnFiltersState,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table"
import { Button } from "@/components/button/Button"
import Icon from "@/components/ui/RenderIcon"

export interface TableProps {
  services: StorageData
}

const Table: React.FC<TableProps> = ({ services }) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const columnHelper = createColumnHelper<TableRow>()
  const tableContainerRef = useRef<HTMLDivElement>(null)

  const tableData = services.table_data
  const featureNames = services.metadata.feature_names
  const featureMetadata = services.metadata.feature_metadata

  // 2. define columns for TanStack Table (memoized for performance)
  const columns = useMemo<ColumnDef<TableRow, any>[]>(() => {
    const serviceColumn = columnHelper.accessor("serviceName", {
      header: "Service",
      cell: (info) => (
        <Link
          href={`/services/storage#${info.getValue()}`}
          className={cn(
            "font-medium text-keppel-800 transition-colors hover:text-keppel-700 focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunglow-400"
          )}
        >
          {humanize(info.getValue())}
        </Link>
      ),
    })

    const featureColumns = featureNames.map((featureName) => {
      const metadata = featureMetadata[featureName]

      return columnHelper.accessor(
        (row: TableRow) => {
          const feature = row[featureName] as ServiceFeature
          return feature?.sortValue ?? feature?.value
        },
        {
          id: featureName,
          header: () => (
            <div className="flex items-center justify-center space-x-2">
              <Icon
                iconName={metadata?.icon}
                className="h-4 w-4 flex-shrink-0"
              />
              <div className="font-medium uppercase">
                {metadata.display_name}
              </div>
            </div>
          ),
          cell: (info) => {
            // Get the full feature object from the original row data
            const feature = info.row.original[featureName] as ServiceFeature
            return (
              <>
                <div className="flex items-center gap-2 font-medium uppercase tracking-wider">
                  <Icon
                    iconName={metadata?.icon}
                    className="h-4 w-4 flex-shrink-0"
                  />
                  <span>{String(feature.value)}</span>
                </div>
                {feature.notes && (
                  <div className="text-xs text-gray-500">
                    {feature.notes.map((note, idx) => (
                      <div key={idx}>• {note}</div>
                    ))}
                  </div>
                )}
              </>
            )
          },
          size: 175,
        }
      )
    })

    return [serviceColumn, ...featureColumns]
  }, [featureNames])

  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
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
    <div className="hidden bg-white p-6 md:block">
      <div className="mb-6">
        <h2 className="mb-2 text-2xl font-bold text-gray-900">
          Service Features Comparison
        </h2>
        <p className="text-gray-600">
          Compare features across different services
        </p>
      </div>

      {/* Search filter */}
      <div className="mb-4">
        <input
          placeholder="Filter services..."
          value={
            (table.getColumn("serviceName")?.getFilterValue() as string) ?? ""
          }
          onChange={(e) =>
            table.getColumn("serviceName")?.setFilterValue(e.target.value)
          }
          className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
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
        className="overflow-y-auto overflow-x-scroll rounded-lg border border-gray-200"
      >
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="sticky top-0 z-20 bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => (
                  <th
                    key={header.id}
                    className={cn(
                      "cursor-pointer px-4 py-3 text-left font-medium uppercase tracking-wider hover:bg-gray-100",
                      index === 0 && "sticky left-0 z-30 bg-gray-50 shadow-md"
                    )}
                    onClick={header.column.getToggleSortingHandler()}
                    style={{ width: header.getSize() }}
                  >
                    <div className="flex items-center gap-4">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      <span>
                        {{
                          asc: "↑",
                          desc: "↓",
                        }[header.column.getIsSorted() as string] ?? "↕"}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell, index) => (
                  <td
                    key={cell.id}
                    className={cn(
                      "min-w-56 px-4 py-4 text-sm",
                      index === 0 && "sticky left-0 z-10 bg-white shadow-md"
                    )}
                    style={{ width: cell.column.getSize() }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-sm text-gray-500">
        Showing {table.getRowModel().rows.length} service(s)
      </p>
    </div>
  )
}

export default Table
