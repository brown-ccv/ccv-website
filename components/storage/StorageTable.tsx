import React, { useMemo, useRef } from 'react';
import { cn, humanize } from '@/lib/utils';
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import Link from 'next/link'
import { TableScrollButton } from '@/components/storage/StorageTableScrollButton';
import { ServiceConfig, SelectedAnswers, TableRow, QuestionsConfig, ServiceFeature, featureIcons, featureColorMap  } from '@/lib/storage-types'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
} from '@tanstack/react-table';
import StorageServiceCard from '@/components/storage/StorageServiceCard';

export interface TableProps {
  services: ServiceConfig[];
  selectedAnswers: SelectedAnswers;
  questions: QuestionsConfig[];
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
      const selectedAnswerValue = currentSelectedAnswers[questionId];

      const yamlQuestion = questions?.find(question => question.affected_feature === questionId);
      if (!yamlQuestion) {
        continue; // Skip this filter if question config is missing
      }

      const selectedYAMLAnswerOption = yamlQuestion.answers.find(answer => answer.answer === selectedAnswerValue);
      if (!selectedYAMLAnswerOption) {
        continue; // Skip this filter if selected answer option is missing
      }

      const allowedCategoryClasses = selectedYAMLAnswerOption.matching_feature_values;

      const serviceFeature = service.features?.find(f => f.name === questionId);

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
      const serviceFeatureClassNormalized = String(serviceFeature.value).toLowerCase();

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
const Table: React.FC<TableProps> = ({ services, selectedAnswers, questions }) => {
  const columnHelper = createColumnHelper<TableRow>();
  const tableContainerRef = useRef<HTMLDivElement>(null);

  // --- FEATURE SORTING LOGIC ---
  // Extract feature names from the form questions once
  const featureNamesInForm = useMemo(() => {
    return questions.map(q => q.affected_feature);
  }, [questions]); // useMemo checks the questions array on every re-render and only runs map if it has changed

  const sortedFeatureNames = useMemo(() => {
    // Get all unique feature names from all services because Globus does not have any features
    const allServiceFeatures = new Set<string>();
    services.forEach(service => {
      service.features?.forEach(feature => {
        allServiceFeatures.add(feature.name);
      });
    });

    // Convert the Set to an Array for filtering and sorting
    const allServiceFeatureNamesArray = Array.from(allServiceFeatures);

    // Separate features: those in the form, and those not
    const featuresInForm = allServiceFeatureNamesArray.filter(featureName =>
      featureNamesInForm.includes(featureName)
    );

    const featuresNotInForm = allServiceFeatureNamesArray.filter(featureName =>
      !featureNamesInForm.includes(featureName)
    );

    // Sort features that are in services the same as the order of the questions in the form
    featuresInForm.sort((a, b) => {
      const indexA = featureNamesInForm.indexOf(a);
      const indexB = featureNamesInForm.indexOf(b);
      return indexA - indexB;
    });

    // Sort features that are not in the form alphabetically
    featuresNotInForm.sort((a, b) => a.localeCompare(b));
    

    // Combine them: form features first, then others alphabetically
    return [...featuresInForm, ...featuresNotInForm];
  }, [services, featureNamesInForm]); // if services and the memoized featureNamesInForm are the same, don't run this again at every re-render

  const tableData: TableRow[] = useMemo(() => {
    return sortedFeatureNames.map(featureName => {
      const row: TableRow = { featureName: featureName };
      services.forEach(service => {
        // If a service doesn't have the feature, its value for that row will be 'undefined'
        row[service.name] = service.features?.find(f => f.name === featureName);
      });
      return row;
    });
  }, [services, sortedFeatureNames]);

  // --- DEFINE COLUMNS FOR TANSTACK TABLE ---
  const columns = useMemo<ColumnDef<TableRow, any>[]>(() => {
    const featureNameColumn: ColumnDef<TableRow, any> = columnHelper.accessor('featureName', {
      id: 'featureName',
      header: () => (
        <div className="text-left px-4 py-2 font-semibold text-neutral-700">Feature</div>
      ),
      cell: info => {
        const featureName = humanize(info.getValue());
        const IconComponent = featureIcons[info.getValue().toLowerCase()];
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
      const isDisabled = getColumnDisabledState(service, selectedAnswers, questions);
      const columnClass = isDisabled ? 'opacity-30 grayscale' : '';

      return columnHelper.accessor(service.name, {
        id: service.name,
        header: () => (
          <Link href={`/services/storage#${service.name}`} className={cn("flex flex-col items-start justify-start text-center px-2 py-2", columnClass)}>
            <div className="font-semibold">{humanize(service.name)}</div>
          </Link>
        ),
        cell: info => {
          const feature = info.getValue() as ServiceFeature;
          const featureNameFromRow = info.row.original.featureName;
          const cellContentClasses = cn("px-4 py-2 text-start", columnClass);

          if (feature === undefined) {
            return (
              <div className={cn("flex flex-col items-center justify-center p-2 min-h-[80px]", cellContentClasses)}>
                <span className="text-neutral-400 text-3xl">-</span>
              </div>
            );
          }

          const featureClassLower = String(feature?.value).toLowerCase();
          const IconComponent = featureIcons[featureNameFromRow.toLowerCase()];
          const valueColor = featureColorMap[featureClassLower] || featureColorMap['default'];

          return (
            <div className={cn("flex flex-col items-center justify-center p-2 min-h-[80px]", cellContentClasses)}>
              <div className={cn("flex gap-2 font-semibold text-xl")}>
                {IconComponent ? <IconComponent className={cn("text-2xl", valueColor)} /> : null}
                <span>
                  {(() => {
                    const featureClassValue = feature?.value;
                    if (typeof featureClassValue === 'boolean') {
                      return featureClassValue ? 'Yes' : 'No';
                    }
                    if (featureNameFromRow === 'security' && typeof featureClassValue === 'number') {
                      return `Level ${featureClassValue}`;
                    }
                    if (featureNameFromRow === 'storage' && typeof featureClassValue === 'string') {
                        if (featureClassValue.includes('TB +')) {
                            return featureClassValue;
                        }
                        if (featureClassValue.includes('TB')) {
                            return featureClassValue;
                        }
                    }
                    return humanize(String(featureClassValue));
                  })()}
                </span>
              </div>
              {feature?.notes && (
                <div className="text-sm text-neutral-500 mt-1 max-w-[300px] text-center tracking-tight">
                  <Markdown 
                    rehypePlugins={[rehypeRaw]} 
                    remarkPlugins={[remarkGfm]}
                  >
                    {String(feature.notes ?? '')}
                  </Markdown>
                </div>
              )}
            </div>
          );
        },
        enableColumnFilter: false,
        size: 150,
      });
    });

    return [featureNameColumn, ...serviceColumns];
  }, [columnHelper, services, selectedAnswers, questions]);

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

  const scrollTable = (direction: 'left' | 'right') => {
    if (tableContainerRef.current) {
      const scrollAmount = 300;
      tableContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* Desktop View - Table */}
      <div className="hidden lg:block w-full overflow-x-scroll rounded-lg shadow-md border border-neutral-200">       
        <div className="relative" ref={tableContainerRef}>
          <div className="flex justify-end p-2 border-b border-neutral-200 bg-white">
            <TableScrollButton
              onClick={() => scrollTable('left')}
              className="mr-2"
              aria-label="Scroll left"
            >
              &lt;
            </TableScrollButton>
            <TableScrollButton
              onClick={() => scrollTable('right')}
              aria-label="Scroll right"
            >
              &gt;
            </TableScrollButton>
          </div>
        </div>
        <div ref={tableContainerRef} className="overflow-x-scroll force-scrollbar">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-white">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header, index) => (
                    <th
                      key={header.id}
                      className={cn(
                        "px-2 py-3 text-left text-md font-medium text-neutral-500 uppercase tracking-wider min-w-[175px]",
                        header.column.getCanSort() ? 'cursor-pointer select-none' : '',
                        index < headerGroup.headers.length - 1 && 'border-r border-neutral-200'
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
                  {row.getVisibleCells().map((cell, index) => (
                    <td key={cell.id}                     className={cn(
                      "py-2",
                      index < row.getVisibleCells().length - 1 && 'border-r border-neutral-200'
                    )}>
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
        {services.map((service) => (
          <StorageServiceCard
            key={service.name}
            service={service}
            questionsConfig={questions}
            selectedAnswers={selectedAnswers}
            isDisabled={getColumnDisabledState(service, selectedAnswers, questions)}
          />
        ))}
      </div>
    </>
  );
};

export default Table;