import React from "react"
import { Hero } from "@/components/Hero"
import { TextAnimate } from "@/components/magicui/text-animate"

export default async function Stronghold() {
  return (
    <div className="w-full">
      <div className="relative w-full flex flex-col">
        <div className="bg-purple-900">
          <Hero image={"/images/hero/hero.jpeg"}>
            <div className="relative inset-x-0 flex-1 flex items-start w-full bg-gradient-to-t from-black/0 via-black/10 to-black/65 z-5">
              <div className="absolute top-[12%] flex flex-col text-white space-y-6 px-12 md:px-24 w-[80vw]">
                <TextAnimate className="font-bold text-6xl md:text-8xl">
                  Stronghold
                </TextAnimate>
                <p className="text-4xl font-semibold">
                  Text tbd.
                </p>
              </div>
            </div>
          </Hero>
        </div>
      </div>
    </div>
  )
}