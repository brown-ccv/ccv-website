"use client"

import React from "react"

const ViewIncidentsButton: React.FC = () => {
  return (
    <div className="flex flex-col">
      <button
        className="px-2.5 py-1.5 bg-amber-400 rounded-[50px]"
        onClick={() => console.log("View Incidents clicked")}
      >
        View Incidents
      </button>
    </div>
  )
}

export default ViewIncidentsButton
