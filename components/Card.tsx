import React from "react"

interface CardProps {
  children?: React.ReactNode
}

export const Card: React.FC<CardProps> = ({ children }) => {
  return <div className="bg-gray-50 shadow-md p-6">{children}</div>
}
