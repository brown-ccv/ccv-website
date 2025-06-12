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

const ClassColors: Record<string, string> = {
  'high': 'text-red-university', 'medium': 'text-amber-600', 'low': 'text-keppel-600',
  '0': 'text-keppel-600', '1': 'text-sunglow-400', '2': 'text-amber-600', '3': 'text-red-university',
  'true': 'text-keppel-600', 'false': 'text-red-university',
  'easy': 'text-keppel-600', 'complex': 'text-red-university', 'partial': 'text-sunglow-400',

  'low cost': 'text-keppel-600', 'medium cost': 'text-sunglow-400', 'high cost': 'text-red-university',

  'hot': 'text-red-university', 'warm': 'text-sunglow-400', 'cold': 'text-cyan-500',
  'fastest': 'text-keppel-600', 'faster': 'text-amber-600', 'fast': 'text-sunglow-400', 'slow': 'text-red-university',

  'small': 'text-cyan-500', 'large': 'text-sunglow-400', 
  '4 gb': 'text-red-university', '1 tb': 'text-amber-600',
  '1 tb +': 'text-sunglow-400', '2 tb +': 'text-sunglow-400', '4 tb': 'text-sunglow-400', 
  '128 tb': 'text-keppel-600', 'unlimited': 'text-keppel-600', 

  'default': 'text-neutral-800',
};

// --- Core Filtering Logic ---
const getColumnDisabledState = (
  service: YAMLServiceConfig,
  currentSelectedAnswers: SelectedAnswers,
  yamlQuestionsConfig: YAMLQuestionConfig[] 
): boolean => {
  // service column is disabled if it fails *any* active filter condition.
  for (const questionId in currentSelectedAnswers) {
    if (currentSelectedAnswers.hasOwnProperty(questionId)) {
      const selectedAnswerValue = currentSelectedAnswers[questionId];

      const yamlQuestion = yamlQuestionsConfig.find(q => q.affected_category === questionId);
      if (!yamlQuestion) {
        console.warn(`[Filtering] Question ID '${questionId}' from selectedAnswers not found in yamlQuestionsConfig.`);
        continue; // Skip this filter if question config is missing
      }

      const selectedYAMLAnswerOption = yamlQuestion.answers.find(ans => ans.answer === selectedAnswerValue);
      if (!selectedYAMLAnswerOption) {
        console.warn(`[Filtering] Selected answer value '${selectedAnswerValue}' for question '${questionId}' not found in YAML options.`, { selectedAnswerValue, yamlQuestion });
        continue; // Skip this filter if selected answer option is missing
      }

      const allowedCategoryClasses = selectedYAMLAnswerOption.category_classes;

      const serviceFeature = service.features.find(f => f.name === questionId);

      // Determine if the selected answer implies a *strict requirement* for the feature.
      const nonStrictAnswers = ['no risk', 'no', 'any', 'not sure', 'less than 1 tb']; 
      const isStrictFilter = !nonStrictAnswers.includes(String(selectedAnswerValue).toLowerCase());

      console.groupCollapsed(`[Filtering Debug] Service: ${service.name}, Filter: ${questionId}`);
      console.log(`Selected Answer: '${selectedAnswerValue}' (Strict: ${isStrictFilter})`);
      console.log(`Allowed Classes (from YAML): [${allowedCategoryClasses.map(c => String(c).toLowerCase()).join(', ')}]`);
      
      if (!serviceFeature) {
        // Case 1: Service does not have the feature
        if (isStrictFilter) {
          console.log(`-> DISABLED: Service lacks feature '${questionId}' required by strict filter.`);
          console.groupEnd();
          return true;
        }
        // If the filter is not strict and service lacks feature,
        // it implicitly passes *this specific* filter, so we continue to the next one
        console.log(`-> PASSED (by default, lacking feature): Filter '${questionId}' is not strict.`);
        console.groupEnd();
        continue; 
      }

      // Case 2: Service *does* have the feature, now check if its class matches the allowed classes.
      const serviceFeatureClassNormalized = String(serviceFeature.class).toLowerCase();
      console.log(`Service Feature Class: '${serviceFeature.name}: ${serviceFeatureClassNormalized}'`);

      // Normalize the service's feature class (can be string, number, boolean) to a lowercase string
      const passesThisSpecificFilter = allowedCategoryClasses.some(allowedClass => {
        return String(allowedClass).toLowerCase() === serviceFeatureClassNormalized;
      });

      if (!passesThisSpecificFilter) {
        // If the feature class doesn't match the allowed classes, the service fails this filter.
        console.log(`-> DISABLED: Feature '${questionId}' with class '${serviceFeatureClassNormalized}' does NOT match allowed classes.`);
        console.groupEnd();
        return true;
      }
      
      console.log(`-> PASSED: Feature '${questionId}' with class '${serviceFeatureClassNormalized}' matches allowed classes.`);
      console.groupEnd();
    }
  }
  console.log(`[Filtering Debug] Service: ${service.name} PASSED ALL FILTERS. Showing.`);
  return false; 
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
          // so cell content is also affected by the column's disabled state
          const cellContentClasses = cn("px-4 py-2 text-start", columnClass);

          if (!feature) {
            return <div className={cellContentClasses}>-</div>;
          }

          const featureClassLower = String(feature.class).toLowerCase();
          const IconComponent = FeatureIcons[feature.name.toLowerCase()];
          const valueColor = ClassColors[featureClassLower] || ClassColors['default'];

          return (
            <div className={cn("flex flex-col items-center justify-center p-2 min-h-[80px]", cellContentClasses)}>
              <div className={cn("flex gap-2 font-semibold text-xl")}>
                {/* Conditionally render IconComponent to avoid errors if it's undefined */}
                {IconComponent && <IconComponent className={cn("text-2xl", valueColor)} />}
                <span>
                  {(() => {
                    const featureClassValue = feature.class;
                    // Handle boolean-like values for 'Yes'/'No' display
                    if (typeof featureClassValue === 'boolean' || String(featureClassValue).toLowerCase() === 'true' || String(featureClassValue).toLowerCase() === 'false') {
                      return String(featureClassValue).toLowerCase() === 'true' ? 'Yes' : 'No';
                    }
                    return String(featureClassValue); // Otherwise, display as-is
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