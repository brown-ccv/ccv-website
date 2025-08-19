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
      className={`flex flex-col items-end justify-end gap-4 ${tabsWrapperClass}`}
    >
      <TabsList
        className={`flex justify-end border border-gray-200 bg-[--tabs-bg] py-6 text-neutral-500`}
      >
        {tabs?.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className={cn(
              "px-4 text-lg hover:text-keppel-600 data-[state=active]:border data-[state=active]:border-keppel-700/50 data-[state=active]:bg-white data-[state=active]:text-keppel-700",
              className
            )}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs?.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className={"w-full"}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  )
}
