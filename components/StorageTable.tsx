import React, { useMemo } from 'react';
import { cn, humanize } from '@/lib/utils';
import { YAMLServiceConfig, SelectedAnswers, TableRow, YAMLQuestionConfig, ServiceFeature, TableProps } from '@/lib/storage-types'
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
import { LuDatabaseBackup } from "react-icons/lu";
import ServiceCard from '@/components/StorageServiceCard';

// --- Helper Mappings for Icons and Colors ---
const FeatureIcons: Record<string, React.ElementType> = {
  'relative_speed': SlSpeedometer,
  'security': FaShieldAlt,
  'cost': FaDollarSign,
  'sharing': FaShareSquare,
  'capacity': FaHdd,
  'doi_provided': SiDoi,
  'data_protection': LuDatabaseBackup,
  'secondary_site_backup': LuDatabaseBackup,
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
  '1 tb +': 'text-sunglow-400', '2 tb +': 'text-sunglow-400', '4 tb': 'text-sunglow-400', '128 tb': 'text-sunglow-400',
  '8 eb': 'text-keppel-600', '9 eb': 'text-keppel-600', 'unlimited': 'text-keppel-600',

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
        continue; // Skip this filter if question config is missing
      }

      const selectedYAMLAnswerOption = yamlQuestion.answers.find(ans => ans.answer === selectedAnswerValue);
      if (!selectedYAMLAnswerOption) {
        continue; // Skip this filter if selected answer option is missing
      }

      const allowedCategoryClasses = selectedYAMLAnswerOption.category_classes;

      const serviceFeature = service.features.find(f => f.name === questionId);

      // Determine if the selected answer implies a *strict requirement* for the feature.
      const nonStrictAnswers = ['no risk', 'no', 'any', 'not sure', 'less than 1 tb'];
      const isStrictFilter = !nonStrictAnswers.includes(String(selectedAnswerValue).toLowerCase());

      if (!serviceFeature) {
        // Case 1: Service does not have the feature
        if (isStrictFilter) {
          return true;
        }
        continue;
      }

      // Case 2: Service *does* have the feature, now check if its class matches the allowed classes.
      const serviceFeatureClassNormalized = String(serviceFeature.class).toLowerCase();

      // Normalize the service's feature class (can be string, number, boolean) to a lowercase string
      const passesThisSpecificFilter = allowedCategoryClasses.some(allowedClass => {
        return String(allowedClass).toLowerCase() === serviceFeatureClassNormalized;
      });

      if (!passesThisSpecificFilter) {
        return true;
      }
    }
  }
  return false;
};

// --- Main Table Component ---
const Table: React.FC<TableProps> = ({ services, selectedAnswers, yamlQuestionsConfig }) => {
  const columnHelper = createColumnHelper<TableRow>();

const tableData: TableRow[] = useMemo(() => {
  const allUniqueFeatureNames = new Set<string>();
  services.forEach(service => {
      service.features.forEach(feature => {
          allUniqueFeatureNames.add(feature.name);
      });
  });

  // TODO: sort the table rows by questions first, then other features alphabetically
  const orderedFeatureNames = Array.from(allUniqueFeatureNames).sort();

  return orderedFeatureNames.map(featureName => {
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
        const IconComponent = FeatureIcons[info.getValue().toLowerCase()];
        return (
          <div className="flex items-center gap-2 px-4 py-2 font-medium text-neutral-900 min-h-[80px] uppercase tracking-wider">
            {IconComponent ? <IconComponent className="text-2xl text-brown-700" /> : null}
            <span>{featureName}</span>
          </div>
        );
      },
      enableColumnFilter: false,
      size: 200,
    });

    const serviceColumns: ColumnDef<TableRow, any>[] = services.map(service => {
      // Determine if the *entire service column* should be disabled (grayed out)
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
          const feature = info.getValue() as ServiceFeature;
          const featureNameFromRow = info.row.original.featureName;
          const cellContentClasses = cn("px-4 py-2 text-start", columnClass);
          const featureClassLower = String(feature.class).toLowerCase();
          const IconComponent = FeatureIcons[featureNameFromRow.toLowerCase()];
          const valueColor = ClassColors[featureClassLower] || ClassColors['default'];

          return (
            <div className={cn("flex flex-col items-center justify-center p-2 min-h-[80px]", cellContentClasses)}>
              <div className={cn("flex gap-2 font-semibold text-xl")}>
                {IconComponent ? <IconComponent className={cn("text-2xl", valueColor)} /> : null}
                <span>
                  {(() => {
                    const featureClassValue = feature.class;
                    if (typeof featureClassValue === 'boolean') {
                      return featureClassValue ? 'Yes' : 'No';
                    }
                    if (featureNameFromRow === 'security' && typeof featureClassValue === 'number') {
                      return `Level ${featureClassValue}`;
                    }
                    return humanize(String(featureClassValue));
                  })()}
                </span>
              </div>
              {feature.notes && (
                <p className="text-sm text-neutral-500 mt-1 max-w-[300px] text-center tracking-tight" title={feature.notes}>
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
    <>
      {/* Desktop View - Table */}
      <div className="hidden lg:block w-full overflow-x-auto rounded-lg shadow-md border border-neutral-200">
        <table className="min-w-full divide-y divide-neutral-200">
          <thead className="bg-white">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className={cn(
                      "px-2 py-3 text-left text-md font-medium text-neutral-500 uppercase tracking-wider min-w-[175px]",
                      header.column.getCanSort() ? 'cursor-pointer select-none' : ''
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

      {/* Mobile View - Cards */}
      <div className="lg:hidden w-full flex flex-col gap-4">
        {services.map((service) => (
          <ServiceCard
            key={service.name}
            service={service}
            yamlQuestionsConfig={yamlQuestionsConfig}
            selectedAnswers={selectedAnswers}
            isDisabled={getColumnDisabledState(service, selectedAnswers, yamlQuestionsConfig)}
          />
        ))}
      </div>
    </>
  );
};

export default Table;