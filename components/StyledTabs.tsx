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
  position?: "right" | "center"
}

export const StyledTabs: React.FC<TabsProps> = ({
  tabs,
  defaultValue,
  className,
  variant = "default",
  position = "right",
}) => {
  // Use the first tab's value as default if none provided
  const defaultTab = defaultValue || tabs?.[0]?.value

  const tabsWrapperClass =
    variant === "neutral"
      ? "[--tabs-bg:theme(colors.neutral.200)]"
      : "[--tabs-bg:theme(colors.stone.100)]"

  const positionConfig = {
    right: {
      tabsList: "flex justify-end",
      tabsTrigger: "px-4",
    },
    center: {
      tabsList: "flex w-full justify-end",
      tabsTrigger: "flex-1 px-4",
    },
  }

  const config = positionConfig[position]
  const tabsListBaseStyles =
    "bg-[--tabs-bg] border border-slate-200 py-6 text-neutral-800"
  const tabsTriggerBaseStyles =
    "data-[state=active]:bg-white data-[state=active]:text-keppel-800 data-[state=active]:font-bold data-[state=active]:border data-[state=active]:border-keppel-700/50 hover:text-keppel-600 text-md"

  return (
    <Tabs
      defaultValue={defaultTab}
      className={`prose prose-sm flex w-full flex-col gap-4 lg:prose-base ${tabsWrapperClass}`}
    >
      <div className="flex w-full justify-end">
        <TabsList
          className={`${config.tabsList} ${tabsListBaseStyles} ml-auto`}
        >
          {tabs?.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={cn(
                tabsTriggerBaseStyles,
                config.tabsTrigger,
                className
              )}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {tabs?.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  )
}
