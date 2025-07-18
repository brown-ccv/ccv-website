import React from "react"
import { Hero } from "@/components/Hero"

export default async function Consulting() {
  return (
    <div className="w-full">
      <Hero 
        image={"/images/hero/hero.jpeg"}
        title="Consulting"
        description="Text tbd."
      />
    </div>
  )
}