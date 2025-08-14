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
    "bg-[--tabs-bg] border border-gray-200 py-6 text-neutral-500"
  const tabsTriggerBaseStyles =
    "data-[state=active]:bg-white data-[state=active]:text-keppel-700 data-[state=active]:border data-[state=active]:border-keppel-700/50 hover:text-keppel-600 text-lg"

  return (
    <Tabs
      defaultValue={defaultTab}
      className={`flex flex-col gap-4 justify-end items-end ${tabsWrapperClass}`}
    >
      <TabsList className={`${config.tabsList} ${tabsListBaseStyles}`}>
        {tabs?.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className={cn(tabsTriggerBaseStyles, config.tabsTrigger, className)}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs?.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="w-full">
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  )
}
