import React, { Suspense } from "react"
import path from "path"
import { Hero } from "@/components/Hero"
import { TextAnimate } from "@/components/magicui/text-animate"
import { SectionHeader } from "@/components/ui/section-header"
import { Card, CardContent } from "@/components/ui/card"
import { CardWithImage } from "@/components/ui/people-card"
import { readContentFile } from "@/lib/content-utils"
import { Workday } from "@/components/Workday"
import { getWorkdayData } from "@/app/about/queries"
import Spinner from "@/components/assets/Spinner"

interface peopleTypes {
  name: string
  type: string
  team: string
  subteam: string
  title: string
  github_username: string
  brown_directory_uuid: string
  bio: string
  image: string
}

function imagePath(imageName: string) {
  return path.join("/images/people", imageName)
}

const fileName = "people.yaml"
const filePath = path.join("content/about", fileName)
const pageContent = await readContentFile(filePath)

export default async function AboutUs() {
  try {
    const workdayData = await getWorkdayData()

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
                    We empower genomic discovery through expert data analysis
                    and investigator support.
                  </p>
                </div>
              </div>
            </Hero>
          </div>
        </div>

        {/* About */}
        <section id="about" className="content-wrapper py-12 lg:py-24">
          <SectionHeader title="About Us" align="center" />
          <Card className="w-full border-none shadow-none rounded-none">
            <CardContent className="max-w-[1440px] mx-auto flex flex-col items-start px-2 py-4 lg:px-6 lg:py-10">
              <p className="text-black md:text-xl">
                The Computational Biology Core (CBC) at Brown University
                provides essential computational support and expertise to
                advance research in human disease. We are a team dedicated to
                empowering researchers with the tools and knowledge needed to
                analyze complex biological data and make groundbreaking
                discoveries.
              </p>
              <p className="text-black md:text-xl pt-4">
                The CBC operates within a unique and collaborative structure at
                Brown, allowing us to leverage diverse resources and expertise:
              </p>
              <ul className="pl-4 lg:pl-10 list-disc">
                <li className="text-black md:text-xl pt-4 pl-4">
                  The CBC was established by the{" "}
                  <a
                    href="https://sites.brown.edu/computational-biology-of-human-disease/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold underline hover:text-blue-700"
                  >
                    Center for Computational Biology of Human Disease (CBHD)
                  </a>
                  , a center funded by a COBRE Institutional Development Award
                  (IDeA) grant from the National Institute of General Medical
                  Science. The CBHD's primary goal is to support and mentor
                  junior investigators in human disease research that requires
                  significant computational analysis of 'omics data. We work
                  directly with CBHD project leaders and pilot award recipients,
                  providing the computational expertise to help them achieve
                  their research aims. This includes creating standard
                  analytical pipelines (e.g., for quality control and RNA Seq
                  analysis), developing customized analysis tools, and offering
                  guidance on experimental design to ensure optimal data
                  acquisition.
                </li>
                <li className="text-black md:text-xl pt-4 pl-4">
                  The CBC is also a team within Brown University's{" "}
                  <a
                    href="https://ccv.brown.edu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold underline hover:text-blue-700"
                  >
                    Center for Computation and Visualization (CCV)
                  </a>
                  , which is part of the Office of Information and Technology.
                  The CCV's mission is to foster an environment where
                  computational best practices, innovative solutions, and expert
                  knowledge converge to build advanced research tools and enable
                  new discoveries. This affiliation with the CCV strengthens our
                  ability to provide cutting-edge computational solutions,
                  drawing upon a diverse team of data scientists and research
                  software engineers with extensive scientific backgrounds. We
                  embody the CCV's commitment to partnering with researchers,
                  often through long-term collaborations.
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Our Mission */}
        <section className="content-wrapper py-24 bg-gray-100">
          <SectionHeader title="Our Mission" align="center" />
          <Card className="w-full border-none shadow-none rounded-none">
            <CardContent className="max-w-[1440px] mx-auto max-h-[600px] flex items-center px-6 py-10">
              <p className="text-black text-xl">
                The primary mission of the Computational Biology Core (CBC) is
                to provide support to junior investigators in the analysis and
                interpretation of high-throughput DNA/RNA sequencing datasets,
                encompassing both internally generated and publicly accessible
                data. The Core is also committed to facilitating scientific
                collaboration among COBRE projects. The long-term objective of
                the CBC is to establish a sustainable resource that addresses
                the evolving data analysis needs of genomic research across
                Brown University and its affiliated hospitals, complemented by
                training initiatives to develop the next cohort of junior
                investigators.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* People */}
        <div className="content-wrapper py-16 sm:py-24">
          <SectionHeader title="People" align="center"></SectionHeader>
          <div className="flex justify-center">
            <div className="flex flex-wrap justify-center gap-y-6 xs:w-1/2">
              {pageContent?.data?.map((person: peopleTypes) => (
                <div key={person.name}>
                  <CardWithImage
                    imagePath={imagePath(person?.image)}
                    hoverImagePath={imagePath(
                      person?.image.replace("main", "hover")
                    )}
                    name={person?.name}
                    title={person?.title}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Careers */}
        <section
          id="careers"
          className="content-wrapper py-24 px-36 bg-gray-100"
        >
          <SectionHeader title="Careers" align="center" />
          <Card className="w-full border-none shadow-none rounded-none">
            <CardContent className="max-w-[1440px] mx-auto max-h-[600px] flex flex-col content-center gap-8">
              <Suspense fallback={<Spinner />}>
                <Workday careers={workdayData} />
              </Suspense>
            </CardContent>
          </Card>
        </section>
      </div>
    )
  } catch (err: any) {
    console.error(err)
    return (
      <div className="text-3xl font-semibold py-10 text-center">
        Error loading careers{" "}
      </div>
    )
  }
}
