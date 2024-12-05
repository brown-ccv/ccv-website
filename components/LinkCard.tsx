import React from "react"

type CardProps = {
  className?: string
}

export function LinkCard({
  className = "",
  children,
}: React.PropsWithChildren<CardProps>) {
  return (
    <section
      className={`"h-full p-6 flex flex-col gap-2 rounded-lg drop-shadow-md hover:drop-shadow-lg transition duration-500" ${className ? className : "bg-gray-50 border-white border-2"}`}
      /* https://design-system.w3.org/components/cards.html#block-link-cards */ data-component="card"
    >
      {children}
    </section>
  )
}
