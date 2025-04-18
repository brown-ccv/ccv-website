import React from "react"
import CCVBars from "@/components/assets/CCVBars"

interface SectionHeaderProps {
  title: string
  align?: "left" | "center"
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  align = "center",
}) => {
  const isCentered = align === "center"

  return (
    <div className={`mb-16 ${isCentered ? "text-center" : "text-left"}`}>
      <div
        className={`relative flex flex-col gap-5 ${
          isCentered ? "items-center" : "items-start"
        }`}
      >
        <CCVBars />
        <h2 className="font-semibold text-black text-4xl tracking-tighter">
          {title}
        </h2>
      </div>
    </div>
  )
}
