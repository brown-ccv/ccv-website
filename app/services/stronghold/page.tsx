import React from "react"
import { Hero } from "@/components/Hero"
import { TextAnimate } from "@/components/magicui/text-animate"

export default async function Stronghold() {
    return (
      <div className="w-full">
        <div className="relative w-full flex flex-col">
          <div className="bg-purple-900">
            <Hero 
              image={"/images/hero/hero.jpeg"}
              title="Stronghold"
              description="Text tbd."
              titleClassName="font-bold text-6xl md:text-8xl"
            />
          </div>
        </div>
      </div>
    )
  }