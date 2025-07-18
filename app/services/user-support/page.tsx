import React from "react"
import { Hero } from "@/components/Hero"

export default async function UserSupport() {
  return (
    <div className="w-full">
      <Hero 
        image={"/images/hero/hero.jpeg"}
        title="User Support"
        description="Text tbd."
      />
    </div>
  )
}