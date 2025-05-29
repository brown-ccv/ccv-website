// app/about/layout.tsx
import React from 'react'
import { Hero } from "@/components/Hero"
import { TextAnimate } from "@/components/magicui/text-animate"
import { getAllContent } from "@/lib/content-utils"


interface props {
  children: React.ReactNode;
}

const content = getAllContent('/content/about')

export default function AboutLayout({ children }: props) {
  return (
    <div>
        <div className="bg-purple-900">
        <Hero image={"/images/hero-subroutes.jpeg"}>
            <div className="relative flex-1 flex items-start w-full px-6 md:px-24 bg-gradient-to-t from-black/0 via-black/10 to-black/65 z-5">
            <div className="absolute top-[12%] flex flex-col text-white space-y-6 w-[80vw]">
                <TextAnimate className="font-bold text-6xl md:text-8xl">
                Careers
                </TextAnimate>
                <p className="text-4xl font-semibold leading-[1.5]">
                {content?.data?.description || ''}
                </p>
            </div>
            </div>
        </Hero>
        </div>

        <main>
            {children}
        </main>

    </div>
  );
}