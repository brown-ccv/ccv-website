// components/Table.tsx
import React, { useMemo } from 'react';
import { cn, humanize } from '@/lib/utils';
import { YAMLFeatureConfig, YAMLServiceConfig, SelectedAnswers, TableRow, TableProps, YAMLQuestionConfig } from '@/lib/storage-types'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
} from '@tanstack/react-table';
import {
  FaThermometerHalf, 
  FaDollarSign, 
  FaShareSquare, 
  FaHdd,
  FaWifi, 
  FaExchangeAlt, 
  FaShieldAlt
} from 'react-icons/fa';
import { FaFile } from "react-icons/fa6";
import { SlSpeedometer } from "react-icons/sl";
import { MdSdStorage } from "react-icons/md";
import { AiOutlineCluster } from "react-icons/ai";
import { SiDoi } from "react-icons/si";
import { SiCanvas } from "react-icons/si";
import { BsDatabaseFillLock } from "react-icons/bs";
import { LuDatabaseBackup } from "react-icons/lu";


// --- Helper Mappings for Icons and Colors ---
// icon mapping for feature names (used in row headers and cell content)
const FeatureIcons: Record<string, React.ElementType> = {
  'relative_speed': SlSpeedometer,
  'security': FaShieldAlt,
  'cost': FaDollarSign,
  'sharing': FaShareSquare,
  'capacity': FaHdd,
  'doi_provided': SiDoi,
  'data_protection_snapshots': LuDatabaseBackup,
  'data_protection_replication': BsDatabaseFillLock,
  'canvas_integration': SiCanvas,
  'brown_network_required': FaWifi,
  'access_from_oscar': AiOutlineCluster,
  'storage_warmth': FaThermometerHalf,
  'collaborative_edits': FaExchangeAlt,
  'shareable_link': FaShareSquare, 
  'max_file_size': FaFile, 
  'storage': MdSdStorage,
};

// color mapping for feature class values (used in cell content)
const ClassColors: Record<string, string> = {
  // general levels
  'high': 'text-red-university',
  'medium': 'text-amber-600',
  'low': 'text-keppel-600',

  // temperature
  'hot': 'text-red-university',
  'warm': 'text-sunglow-400',
  'cold': 'text-cyan-500',

  // speed
  'fastest': 'text-keppel-600',
  'faster': 'text-amber-600',
  'fast': 'text-sunglow-400',
  'slow': 'text-red-university',

  // security risk levels
  '0': 'text-keppel-600',
  '1': 'text-sunglow-400',
  '2': 'text-amber-600',
  '3': 'text-red-university',

  // booleans
  'true': 'text-keppel-600',
  'false': 'text-red-university',
  'True': 'text-keppel-600',
  'False': 'text-red-university',

  // sharing
  'easy': 'text-keppel-600',
  'complex': 'text-red-university',
  'partial': 'text-sunglow-400',

  // cost
  'low cost': 'text-keppel-600',
  'medium cost': 'text-sunglow-400',
  'high cost': 'text-red-university',

  // capacity
  'small': 'text-cyan-500',
  'large': 'text-sunglow-400',
  '4 gb': 'text-red-university',
  '1 tb': 'text-amber-600',
  '1 tb +': 'text-sunglow-400',
  '2 tb +': 'text-sunglow-400',
  'unlimited': 'text-keppel-600',
  '4 tb': 'text-sunglow-400',
  '128 tb': 'text-keppel-600',

  'default': 'text-neutral-800',
};

// --- Core Filtering Logic ---
// this function determines if a service column should be visually disabled/grayed out
const getColumnDisabledState = (
  service: YAMLServiceConfig,
  currentSelectedAnswers: SelectedAnswers,
  yamlQuestionsConfig: YAMLQuestionConfig[] 
): boolean => {
  // service column is disabled if it fails *any* active filter condition
  for (const questionId in currentSelectedAnswers) {
    if (currentSelectedAnswers.hasOwnProperty(questionId)) {
      const selectedAnswerValue = currentSelectedAnswers[questionId];

      // if no answer is selected for this question, it means this filter is not active, so skip it.
      // if (!selectedAnswerValue) continue;

      // 1. find the full YAML question configuration for the current `questionId` (which is `affected_category`)
      const yamlQuestion = yamlQuestionsConfig.find(q => q.affected_category === questionId);
      if (!yamlQuestion) {
        // if the question ID from the form doesn't match any in YAML, it's a configuration issue.
        // for robustness, we'll continue, effectively not filtering by this invalid question.
        console.warn(`Question ID '${questionId}' from selectedAnswers not found in yamlQuestionsConfig.`);
        continue;
      }

      // 2. find the specific answer object from the YAML question that matches the selected form answer
      const selectedYAMLAnswerOption = yamlQuestion.answers.find(ans => ans.answer === selectedAnswerValue);
      if (!selectedYAMLAnswerOption) {
        // if the selected answer value from the form doesn't match an option in YAML.
        console.warn(`Selected answer value '${selectedAnswerValue}' for question '${questionId}' not found in YAML options.`);
        continue;
      }

      const allowedCategoryClasses = selectedYAMLAnswerOption.category_classes; // e.g., [2, 3] or ['True']

      // 3. Find the service's feature that corresponds to this `affected_category` (questionId)
      const serviceFeature = service.features.find(f => f.name === questionId);

      // 4. Check if the service's feature passes the filter
      // If the service does not have this feature, or its 'class' is not a string, it fails the filter.
      if (!serviceFeature || typeof serviceFeature.class !== 'string') {
        // If a service lacks a feature that a filter is applied to, it should be greyed out.
        // Example: If a user filters by 'DOI Provided: Yes', and a service doesn't have 'DOI_provided' feature at all, it fails.
        return true; // Mark service as disabled
      }

      // Normalize the service's feature class to a lowercase string for robust comparison.
      // This handles cases where YAML might have "True" and feature.class is "true".
      const serviceFeatureClassNormalized = String(serviceFeature.class).toLowerCase();

      // Check if the service's feature.class is present in the `allowedCategoryClasses`
      const passesThisSpecificFilter = allowedCategoryClasses.some(allowedClass => {
        // Convert each allowed class to a lowercase string for comparison,
        // as `category_classes` can contain numbers, booleans, or strings.
        return String(allowedClass).toLowerCase() === serviceFeatureClassNormalized;
      });

      if (!passesThisSpecificFilter) {
        return true; // This service fails the current filter, so the entire column is disabled.
      }
    }
  }
  return false; // If the service passes all active filters, it's not disabled.
};

// --- Main Table Component ---
const Table: React.FC<TableProps> = ({ services, selectedAnswers, yamlQuestionsConfig }) => {
  const columnHelper = createColumnHelper<TableRow>();

  // 1. Transform services data into rows for TanStack Table
  const tableData: TableRow[] = useMemo(() => {
    const uniqueFeatureNames = new Set<string>();
    services.forEach(service => {
      service.features.forEach(feature => uniqueFeatureNames.add(feature.name));
    });

    // Sort feature names alphabetically for consistent row order
    const sortedFeatureNames = Array.from(uniqueFeatureNames).sort();

    return sortedFeatureNames.map(featureName => {
      const row: TableRow = { featureName: featureName };
      services.forEach(service => {
        row[service.name] = service.features.find(f => f.name === featureName);
      });
      return row;
    });
  }, [services]);

  // 2. define columns for TanStack Table (memoized for performance)
  const columns = useMemo<ColumnDef<TableRow, any>[]>(() => {
    const featureNameColumn: ColumnDef<TableRow, any> = columnHelper.accessor('featureName', {
      id: 'featureName',
      header: () => (
        <div className="text-left px-4 py-2 font-semibold text-neutral-700">Feature</div>
      ),
      cell: info => {
        const featureName = humanize(info.getValue());
        // ensure featureName is treated as string for icon lookup
        return (
          <div className="flex items-center gap-2 px-4 py-2 font-medium text-neutral-900 min-h-[80px] uppercase tracking-wider">
            <span>{featureName}</span>
          </div>
        );
      },
      enableColumnFilter: false,
      size: 200,
    });

    const serviceColumns: ColumnDef<TableRow, any>[] = services.map(service => {
      // Determine disabled state for this service column based on current filters
      const isDisabled = getColumnDisabledState(service, selectedAnswers, yamlQuestionsConfig);
      const columnClass = isDisabled ? 'opacity-30 grayscale' : ''; 
      
      return columnHelper.accessor(service.name, {
        id: service.name,
        header: () => (
          <div className={cn("flex flex-col items-start justify-start text-center px-2 py-2", columnClass)}>
            <div className="font-semibold">{humanize(service.name)}</div>
          </div>
        ),
        cell: info => {
          const feature = info.getValue() as YAMLFeatureConfig | undefined;

          // combine columnClass with cell-specific classes
          // this ensures that the cell content is also affected by the column's disabled state
          const cellContentClasses = cn("px-4 py-2 text-start", columnClass);

          if (!feature) {
            return <div className={cellContentClasses}>-</div>;
          }

          // safely convert feature.class to lowercase string for color lookup
          const featureClassLower = String(feature.class).toLowerCase();
          const IconComponent = FeatureIcons[feature.name.toLowerCase()];
          const valueColor = ClassColors[featureClassLower] || ClassColors['default'];

          return (
            <div className={cn("flex flex-col items-center justify-center p-2 min-h-[80px]", cellContentClasses)}>
              <div className={cn("flex gap-2 font-semibold text-xl")}>
                <IconComponent className={cn("text-2xl", valueColor)} />
                <span>
                  {(() => {
                    const featureClassValue = feature.class;
                    if (typeof featureClassValue === 'boolean') {
                      return featureClassValue ? 'Yes' : 'No';
                    }
                    return String(featureClassValue);
                  })()}
                </span>
              </div>
              {feature.notes && (
                <p className="text-sm text-neutral-500 mt-1 max-w-[250px] text-center" title={feature.notes}>
                  {feature.notes}
                </p>
              )}
            </div>
          );
        },
        enableColumnFilter: false,
        size: 150,
      });
    });

    return [featureNameColumn, ...serviceColumns];
  }, [columnHelper, services, selectedAnswers, yamlQuestionsConfig]); 

  const table = useReactTable({
    data: tableData, 
    columns,
    getCoreRowModel: getCoreRowModel(),
    defaultColumn: {
      minSize: 100,
      maxSize: 300,
      size: 200,
    }
  });

  return (
    <div className="overflow-x-auto rounded-lg shadow-md border border-neutral-200 w-full">
      <table className="min-w-full divide-y divide-neutral-200">
        <thead className="bg-white">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className={cn(
                    "px-2 py-3 text-left text-md font-medium text-neutral-500 uppercase tracking-wider",
                    header.column.getCanSort() ? 'cursor-pointer select-none' : ''
                  )}
                  style={{ width: header.getSize() }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-neutral-200">
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="py-2">
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
  );
};

export default Table;