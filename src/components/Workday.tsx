"use client"

import React from "react"
import { OpportunitiesCard } from "@/components/card/OpportunitiesCard"

interface PositionProps {
  title: string
  externalPath: string
}

export function Workday({ careers }: { careers: any[] }) {
  return (
    <div>
      {careers?.length > 0 ? (
        careers.map((position: PositionProps, index) => (
          <div key={position.externalPath} className="mb-4 last:mb-0">
            <OpportunitiesCard position={position} />
          </div>
        ))
      ) : (
        <p>
          There are no positions open at the moment. Check back with us in the
          future. We appreciate your interest!
        </p>
      )}
    </div>
  )
}
