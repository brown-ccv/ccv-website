import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs"
import React from "react"
import { cn } from "@/lib/utils"

export interface TabItem {
  value: string
  label: string
  content: React.ReactNode
}

interface TabsProps {
  tabs: TabItem[]
  defaultValue?: string
  className?: string
}

export const StyledTabs: React.FC<TabsProps> = ({
  tabs,
  defaultValue,
  className,
}) => {
  // Use the first tab's value as default if none provided
  const defaultTab = defaultValue || tabs?.[0]?.value

  return (
    <Tabs defaultValue={defaultTab} className={cn("bg-white", className)}>
      <TabsList>
        {tabs?.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="inline-block border-b-2 rounded-none hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 data-[state=active]:bg-neutral-50 data-[state=active]:text-keppel-700 data-[state=active]:border-keppel-700"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs?.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  )
}
