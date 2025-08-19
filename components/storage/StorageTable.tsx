import React, { useMemo, useRef } from "react"
import { cn, humanize } from "@/lib/utils"
import Link from "next/link"
import { ChevronRightIcon, ChevronLeftIcon } from "lucide-react"
import {
  ServiceConfig,
  TableRow,
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
import { getAllUniqueFeatureNames } from "@/components/storage/utils"

export interface TableProps {
  services: ServiceConfig[]
}

const Table: React.FC<TableProps> = ({ services }) => {
  const columnHelper = createColumnHelper<TableRow>()
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const tableContainerRef = useRef<HTMLDivElement>(null)
  const featureNames = useMemo(() => getAllUniqueFeatureNames(services), [])

  const tableData: TableRow[] = useMemo(() => {
    // Filter services to only include those with at least one feature
    const servicesWithFeatures = services.filter(
      (service) => service.features && service.features.length > 0
    )

    return servicesWithFeatures.map((service) => {
      const row: TableRow = {
        serviceName: service.name,
        description: service.description,
        links: service.links,
      }

      // Add each feature as a property
      service.features.forEach((feature) => {
        row[feature.name] = feature
      })

      return row
    })
  }, [services])

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

    const featureColumns = featureNames.map((featureName) =>
      columnHelper.accessor(
        (row: TableRow) => {
          const feature = row[featureName] as ServiceFeature
          return feature?.value // Return just the value for sorting
        },
        {
          id: featureName,
          header: () => {
            const IconComponent = featureIcons[featureName.toLowerCase()]
            return (
              <div className="flex items-center gap-2 font-medium">
                {IconComponent ? (
                  <IconComponent className="text-brown-700 h-4 w-4 flex-shrink-0" />
                ) : null}
                {featureName
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())}
              </div>
            )
          },
          cell: (info) => {
            const feature = info.row.original[featureName] as ServiceFeature
            const IconComponent = featureIcons[featureName.toLowerCase()]
            const valueColor =
              featureColorMap[String(feature.value).toLowerCase()] ||
              featureColorMap["default"]
            if (!feature) return <span className="text-gray-400">—</span>

            return (
              <>
                <div className="flex items-center gap-2 font-medium uppercase tracking-wider">
                  {IconComponent ? (
                    <IconComponent
                      className={cn("h-6 w-6 flex-shrink-0", valueColor)}
                    />
                  ) : null}
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
        }
      )
    )

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

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="w-40 cursor-pointer px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 hover:bg-gray-100"
                    onClick={header.column.getToggleSortingHandler()}
                    style={{ width: header.getSize() }}
                  >
                    <div className="flex items-center space-x-1">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      <span className="ml-1">
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
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="min-w-44 px-4 py-4 text-sm"
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
