import React from "react"
import { Hero } from "@/components/Hero"
import { SectionHeader } from "@/components/ui/section-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { TextAnimate } from "@/components/magicui/text-animate"
import { UserIcon } from "@heroicons/react/24/solid"
import { FeaturedCarousel, FeaturedCarouselItem } from "@/components/FeaturedCarousel";


const featuredCarouselData: FeaturedCarouselItem[] = [
  {
    title: "INTRO TO LINUX",
    category: "Linux",
    description:
      "Description of intro to linux needed.",
    image: "/images/featured-carousel/provident.png",
    websiteUrl: "https://provident-study.org",
    viewMoreUrl: "/provident",
    profile: "Brown School of Public Health"
  },
  {
    title: "INTRO TO OSCAR",
    category: "HPC",
    description: "Description of Oscar needed.",
    image: "/images/featured-carousel/provident.png",
    profile: "High Performance Computing"
  },
  {
    title: "FUNDAMENTALS OF HIGH-PERFORMANCE COMPUTING",
    category: "HPC",
    description: "Description of hpc needed.",
    image: "/images/featured-carousel/provident.png",
    profile: "Brown School of Public Health"
  },
  {
    title: "USING MATLAB ON OSCAR",
    category: "Statistics",
    description: "Description of Matlab needed.",
    image: "/images/featured-carousel/provident.png",
    profile: "Brown School of Public Health"
  },
  {
    title: "INTO TO STATISTICAL ANALYSIS WITH R ON OSCAR",
    category: "Statistics",
    description: "Description of R needed.",
    image: "/images/featured-carousel/provident.png",
    profile: "High Performance Computing"
  },
]

const profiles = [
  {
  icon: <UserIcon className="w-6 h-6" />,
  name: "Brown School of Public Health",
  organization: "People, Place and Health Collective",
  websiteUrl: "https://provident-study.org",
  viewMoreUrl: "/provident",
  },
  {
    icon: <UserIcon className="w-6 h-6" />,
    name: "High Performance Computing",
    organization: "Center for Computation and Visualization",
    websiteUrl: "https://ccv.brown.edu",
    viewMoreUrl: "/about/us",
  },
]

export default async function ClassroomSupport() {
    return (
      <div className="w-full">
        
        <div className="relative w-full flex flex-col">
          <div className="bg-purple-900">
            <Hero image={"/images/hero-subroutes.jpeg"}>
              <div className="relative flex-1 flex items-start w-full px-6 md:px-24 bg-gradient-to-t from-black/0 via-black/10 to-black/65 z-5">
                <div className="absolute top-[12%] flex flex-col text-white space-y-6">
                  <TextAnimate className="font-bold text-6xl md:text-8xl">
                    Classroom Support
                  </TextAnimate>
                  <p className="text-4xl font-semibold">
                    CCV services to help faculty in the classroom. We can provide tutorial or give you access to cutting edge technology for teaching with code
                  </p>
                </div>
              </div>
            </Hero>
          </div>
        </div>

      {/* In Class Tutorials */}
      <section className="content-wrapper pt-24 px-14 lg:px-36">
        <SectionHeader title="In-Class Tutorials" align="center" />
        <Card className="w-full border-none shadow-none rounded-none">
          <CardContent className="mx-auto flex items-center px-6">
            <div>
              <p className="text-black text-xl pb-4">
                CCV offers a variety of tutorials to provide students with experience using Brown's HPC systems. CCV staff members provide students with an overview of the topic and guide them through a series of hands-on activities. Tutorials can range from the basics of using HPC systems to the use of specific applications on Brown's HPC systems.
              </p>
              <Button variant="primary_filled" size="lg">
                <a href="https://docs.ccv.brown.edu/oscar/account-types" target="_blank" rel="noopener noreferrer">Learn More</a>
              </Button>
              <Button variant="primary_filled" size="lg">
                <a href="mailto:support@ccv.brown.edu" target="_blank" rel="noopener noreferrer">Request Student Accounts</a>
              </Button>
            </div>
          </CardContent>
        </Card>
        <FeaturedCarousel carouselData={featuredCarouselData} profiles={profiles} />
      </section>

      {/* Student Accounts */}
      <section className="content-wrapper py-24 px-14 lg:px-36 bg-neutral-50">
        <SectionHeader title="Student Accounts" align="center" />
        <Card className="w-full border-none shadow-none rounded-none">
          <CardContent className="mx-auto flex items-center px-6">
            <div className="text-black text-xl" >
              <p className="pb-8">
                CCV provides access to HPC resources for classes, workshops, demonstrations, and other instructional uses. We do ask that you follow these guidelines to help us better support your class.
              </p>
              <ul className="pl-10 py-6">
                <li className="py-2">
                * Provide at least two week’s notice for new account requests and software requests. List all the names and emails of users (students, TAs, instructors) as well as the course number.
                </li>
                <li className="py-2">
                * The instructor and/or TA(s) are responsible for all software setup.
                </li>
                <li className="py-2">
                * Oscar is a shared resource, so access nodes and speed cannot be guaranteed.
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>        
      </section>

      {/* Computational Notebooks */}
      <section className="content-wrapper py-24 px-14 lg:px-36">
        <SectionHeader title="Computational Notebooks" align="center" />

        <Card className="w-full border-none shadow-none rounded-none">
          <CardContent className="mx-auto flex items-center px-6">
            <div>
              <p className="text-black text-xl pb-8">
                Computational Notebooks provide a convenient, cloud-hosted way to serve Jupyter Notebooks for multiple users. Notebooks are launched within a pre-configured computing environment so that users do not need to install any software packages. This set-up free environment is ideal for courses and workshops where instructors intend for students to begin coding with minimal obstacles. Jupyter’s flexibility allows instructors to pick the preferred language for a particular context, including Python, Julia, R and many more.
              </p>
            </div>
            </CardContent>
            </Card>

            <Card className="w-full border-none shadow-none rounded-none">
              <CardContent className="mx-auto flex items-center px-6">
                <div className="text-black text-xl pb-8">
                  <h1 className="text-3xl font-semibold pb-8">Google Colab</h1>
                    <p >
                      Google Colab comes bundled with most Python-specific software libraries, and it supports real-time collaboration. It integrates with Google Drive and should be sufficient for most classroom or workshop needs.
                    </p>
                    <Button variant="primary_filled" size="lg">
                      <a href="https://colab.google" target="_blank" rel="noopener noreferrer">Learn More</a>
                    </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="w-full border-none shadow-none rounded-none">
            <CardContent className="mx-auto flex items-center px-6">
            <div>
              <h1 className="text-3xl font-semibold pb-8">Brown JupyterLab</h1>
              <p className="text-black text-xl">
                For more advanced needs, Brown’s JupyterHub may be a good fit for your needs. If you are an instructor, CCV can provide access to JupyterHub for your class or workshop, and Digital Learning and Design (DLD) can assist with integrating computational assignments into curricula. The implementation is supported by Brown OIT; please follow the link below to request an instance for your class. OIT staff will respond to your request to begin the setup process. We ask that requests for JupyterHub be made at least two months in advance of expected course deployment.
              </p>
              <Button variant="primary_filled" size="lg">
                <a href="https://docs.ccv.brown.edu/jupyterhub" target="_blank" rel="noopener noreferrer">Documentation</a>
              </Button>
              <Button variant="primary_filled" size="lg">
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSct9rFCxLhPIezHI-RYRyEuSnvHrPZLMuUSFRTriIyd_3TAfA/viewform?usp=sf_link" target="_blank" rel="noopener noreferrer">Request a Hub</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}