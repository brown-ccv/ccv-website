import React from "react"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import Markdown from "react-markdown"

interface TwoColumnsProps {
  items: string[]
}

export function TwoColumns({ items }: TwoColumnsProps) {
  return (
    <div className="flex flex-col flex-wrap md:flex-row md:justify-center">
      {items.map((item, i) => (
        <div key={i} className="md:w-1/2 md:p-6">
          <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {item}
          </Markdown>
        </div>
      ))}
    </div>
  )
}
