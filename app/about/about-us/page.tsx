import React from "react"
import { Hero } from "@/components/Hero"
import { TextAnimate } from "@/components/magicui/text-animate"
import { SectionHeader } from "@/components/ui/section-header"
import { Card, CardContent, CardWithImage } from "@/components/ui/card"

const people = [
  {
    name: "Ashley Lee",
    href: "/ashley-lee",
    image: "/images/people/ashley_main.jpg",
  },
  {
    name: "Ashley Lee",
    href: "/ashley-lee",
    image: "/images/people/ashley_main.jpg",
  },
  {
    name: "Ashley Lee",
    href: "/ashley-lee",
    image: "/images/people/ashley_main.jpg",
  },
]

export default async function AboutUs() {
    return (
      <div className="w-full">
        <div className="relative w-full flex flex-col">
          <div className="bg-purple-900">
            <Hero image={"/images/hero-subroutes.jpeg"}>
                  <div className="relative flex-1 flex items-start w-full px-6 md:px-24 bg-gradient-to-t from-black/0 via-black/10 to-black/65 z-5">
                    <div className="absolute top-[12%] flex flex-col text-white space-y-6">
                      <TextAnimate className="font-bold text-6xl md:text-8xl">
                        About Us
                      </TextAnimate>
                      <p className="text-4xl font-semibold">
                      Text tbd.
                      </p>
                    </div>
                  </div>
              </Hero>
            </div>
        </div>

        {/* Intro to OIT */}
        <section className="content-wrapper py-24">
          <SectionHeader title="Office of Information Technology" align="center" />
            <Card className="w-full border-none shadow-none rounded-none">
              <CardContent className="max-w-[1440px] mx-auto max-h-[600px] flex items-center px-6 py-10">
                <p className="text-black text-xl">
                  The Center for Computation and Visualization (CCV) is a center within the University's central IT organization, which is the Office of Information Technology (OIT). In addition to building and maintaining the University's hundreds of enterprise software, systems, and hardware, OIT is also responsible for driving the technological progress that enables scientific research. Executing on the University's research mission is the key role that CCV plays in OIT.
                </p>
              </CardContent>
            </Card>
        </section>

        {/* Our Mission */}
        <section className="content-wrapper py-24 bg-gray-100">
          <SectionHeader title="Our Mission" align="center" />
            <Card className="w-full border-none shadow-none rounded-none">
              <CardContent className="max-w-[1440px] mx-auto max-h-[600px] flex items-center px-6 py-10">
                <p className="text-black text-xl">
                  We envision an environment where computational best practices, innovative solutions, and expert knowledge combine to build advanced tools for research and to enable new discoveries. Our mission is to provide the scientific and technical computing expertise required to advance computational research and support Brown’s academic mission. In practice, this frequently means partnering with researchers for projects that may span weeks, months, or years. In some cases, these partnerships can involve researchers using grant funds as partial support of one of our research software engineers or data scientists. We have a team of data scientists and research software engineers with a huge variety of scientific backgrounds (e.g., Engineering, Physics, Computer Vision, Biology, Psychology, Statistics, Applied Math, Computer Science, etc.), so we can closely calibrate a person with a project.
                </p>
              </CardContent>
            </Card>
        </section>

        {/* People */}
        <section className="content-wrapper py-24 flex flex-wrap justify-center">
          <SectionHeader title="People" align="center" />
          <div>
            <Card className="w-full border-none shadow-none rounded-none">
              <CardContent className="max-w-[1440px] mx-auto max-h-[600px] flex items-center px-6 py-10">
                {people.map((person) => {
                  return (
                    <Card key={person.name}>
                      <CardWithImage imagePath={person.image} className="">
                        {person.name}
                      </CardWithImage>
                    </Card>
                  )
                })}
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    )
  }