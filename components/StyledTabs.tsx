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
  variant?: "default" | "neutral"
}

export const StyledTabs: React.FC<TabsProps> = ({
  tabs,
  defaultValue,
  className,
  variant = "default",
}) => {
  // Use the first tab's value as default if none provided
  const defaultTab = defaultValue || tabs?.[0]?.value
  const tabsWrapperClass =
    variant === "neutral"
      ? "[--tabs-bg:theme(colors.neutral.200)]"
      : "[--tabs-bg:theme(colors.stone.100)]  "
  return (
    <Tabs
      defaultValue={defaultTab}
      className={`flex flex-col gap-4 justify-end items-end ${tabsWrapperClass}`}
    >
      <TabsList
        className={`flex justify-end bg-[--tabs-bg] border border-gray-200 py-6 text-neutral-500 `}
      >
        {tabs?.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className={cn(
              "data-[state=active]:bg-white data-[state=active]:text-keppel-700 data-[state=active]:border data-[state=active]:border-keppel-700/50 hover:text-keppel-600 px-4 text-lg",
              className
            )}
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
