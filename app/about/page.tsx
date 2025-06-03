import React from "react"
import { Hero } from "@/components/Hero"
import { TextAnimate } from "@/components/magicui/text-animate"
import { SectionHeader } from "@/components/ui/section-header"
import { Card, CardContent } from "@/components/ui/card"
import { CardWithImage } from "@/components/ui/people-card"

const people = [
  {
    name: "Ashley Lee",
    title: "Senior Research Software Engineer",
    href: "/ashley-lee",
    image: "/images/people/ashley_main.jpg",
    hover: "/images/people/ashley_hover.jpg",
  },
  {
    name: "Ashley Lee",
    title: "Senior Research Software Engineer",
    href: "/ashley-lee",
    image: "/images/people/ashley_main.jpg",
    hover: "/images/people/ashley_hover.jpg",
  },
  {
    name: "Ashley Lee",
    title: "Senior Research Software Engineer",
    href: "/ashley-lee",
    image: "/images/people/ashley_main.jpg",
    hover: "/images/people/ashley_hover.jpg",
  },
  {
    name: "Ashley Lee",
    title: "Senior Research Software Engineer",
    href: "/ashley-lee",
    image: "/images/people/ashley_main.jpg",
    hover: "/images/people/ashley_hover.jpg",
  },
  {
    name: "Ashley Lee",
    title: "Senior Research Software Engineer",
    href: "/ashley-lee",
    image: "/images/people/ashley_main.jpg",
    hover: "/images/people/ashley_hover.jpg",
  },
  {
    name: "Ashley Lee",
    title: "Senior Research Software Engineer",
    href: "/ashley-lee",
    image: "/images/people/ashley_main.jpg",
    hover: "/images/people/ashley_hover.jpg",
  },
  {
    name: "Ashley Lee",
    title: "Senior Research Software Engineer",
    href: "/ashley-lee",
    image: "/images/people/ashley_main.jpg",
    hover: "/images/people/ashley_hover.jpg",
  },
  {
    name: "Ashley Lee",
    title: "Senior Research Software Engineer",
    href: "/ashley-lee",
    image: "/images/people/ashley_main.jpg",
    hover: "/images/people/ashley_hover.jpg",
  },
  {
    name: "Ashley Lee",
    title: "Senior Research Software Engineer",
    href: "/ashley-lee",
    image: "/images/people/ashley_main.jpg",
    hover: "/images/people/ashley_hover.jpg",
  },
]

export default async function AboutUs() {
  return (
    <div className="w-full">
      <div className="relative w-full flex flex-col">
        <div className="bg-blue-navbar">
          <Hero image={"/images/hero-subroutes.jpeg"}>
            <div className="relative flex-1 flex items-start w-full px-6 md:px-24 bg-gradient-to-t from-black/0 via-black/10 to-black/65 z-5">
              <div className="absolute top-[12%] flex flex-col text-white space-y-6 w-[80vw]">
                <TextAnimate className="font-bold text-6xl md:text-8xl">
                  About Us
                </TextAnimate>
                <p className="text-4xl font-semibold leading-[1.5]">
                  The Center for Computation and Visualization provides
                  high-performance computing and visualization services to the
                  Brown community. We also collaborate with researchers on
                  projects across vast range of disciplines.
                </p>
              </div>
            </div>
          </Hero>
        </div>
      </div>

      {/* Our Mission */}
      <section className="content-wrapper py-24 bg-gray-100">
        <SectionHeader title="Our Mission" align="center" />
        <Card className="w-full border-none shadow-none rounded-none">
          <CardContent className="max-w-[1440px] mx-auto max-h-[600px] flex items-center px-6 py-10">
            <p className="text-black text-xl">
              The primary mission of the Computational Biology Core (CBC) is to
              provide support to junior investigators in the analysis and
              interpretation of high-throughput DNA/RNA sequencing datasets,
              encompassing both internally generated and publicly accessible
              data. The Core is also committed to facilitating scientific
              collaboration among COBRE projects. The long-term objective of the
              CBC is to establish a sustainable resource that addresses the
              evolving data analysis needs of genomic research across Brown
              University and its affiliated hospitals, complemented by training
              initiatives to develop the next cohort of junior investigators.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* People */}
      <div className="content-wrapper py-16 sm:py-24">
        <SectionHeader title="People" align="center"></SectionHeader>
        <div className="flex flex-wrap justify-center gap-y-8">
          {people.map((person) => (
            <div key={person.name}>
              <CardWithImage
                imagePath={person.image}
                hoverImagePath={person.hover}
                name={person.name}
                title={person.title}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
