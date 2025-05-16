import React from "react"
import { Hero } from "@/components/Hero"
import { TextAnimate } from "@/components/magicui/text-animate"
import { SectionHeader } from "@/components/ui/section-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { cardVariants } from "@/components/ui/variants"
import { FaEnvelopeOpenText, FaTicketAlt, FaBookReader, FaSlack } from "react-icons/fa"


const officeHours = [
  {
    title: "Computational Biology Core",
    subtitle: "Join us remotely.",
    description: "TUESDAYS <br/><br/> 11am - 12pm <br/><br/><br/> WEDNESDAYS <br/><br/> 3pm - 4pm",
    buttonText: "Find Zoom Link",
    href: "/ashley-lee",
  },
  {
    title: "Center for Computation and Visualization",
    subtitle: "Join us remotely or in-person.",
    description: "FRIDAYS <br/><br/> 10am - 12pm",
    buttonText: "Find Zoom Link",
    href: "/ashley-lee",
  }
]

const contactUs = [
  {
    title: "Email",
    icon: <FaEnvelopeOpenText/>, 
    description: "Inquire about resources, support, or a potential collaboration for a research project.",
    buttonText: "Find Zoom Link",
    href: "/ashley-lee",
  },
  {
    title: "Submit a Ticket",
    icon: <FaTicketAlt/>, 
    description: "Open a ticket with our user services team. We will respond as soon as possible.",
    buttonText: "Submit a Ticket",
    href: "/ashley-lee",
  },
  {
    title: "Documentation",
    icon: <FaBookReader/>, 
    description: "View Documentation for CCV Services, such as for Stronghold, Oscar, or Globus.",
    buttonText: "View the Docs",
    href: "/ashley-lee",
  },
  {
    title: "CCV Slack",
    icon: <FaSlack/>,
    description: "CCV Share is a collection of Slack channels where CCV Staff and the ocmmunity will be available to discuss your questions.",
    buttonText: "Join the Slack",
    href: "/ashley-lee",
  }
]

export default async function ContactUs() {
    return (
      <div className="w-full">
        <div className="relative w-full flex flex-col">
          <div className="bg-purple-900">
            <Hero image={"/images/hero-subroutes.jpeg"}>
                  <div className="relative flex-1 flex items-start w-full px-6 md:px-24 bg-gradient-to-t from-black/0 via-black/10 to-black/65 z-5">
                    <div className="absolute top-[12%] flex flex-col text-white space-y-6 w-[80vw]">
                      <TextAnimate className="font-bold text-6xl md:text-8xl">
                        Contact Us
                      </TextAnimate>
                      <p className="text-4xl font-semibold leading-[1.5]">
                        The Center for Computation and Visualization is available to help you in multiple ways. We strive to keep our documentation up to date so you can always find what you need. In addition, you can reach out to us using the channels listed here.
                      </p>
                    </div>
                  </div>
              </Hero>
            </div>
        </div>

      {/* Contact Us */}
      <section className="content-wrapper py-24">
        <SectionHeader title="Contact Us" align="center" />
        <Card className="w-full border-none shadow-none rounded-none">
          <CardContent className="max-w-[1440px] mx-auto max-h-[600px] flex items-center px-6 py-10">
            <p className="text-black text-xl">
              The Center for Computation and Visualization (CCV) is a center within the University's central IT organization, which is the Office of Information Technology (OIT). In addition to building and maintaining the University's hundreds of enterprise software, systems, and hardware, OIT is also responsible for driving the technological progress that enables scientific research. Executing on the University's research mission is the key role that CCV plays in OIT.
            </p>
          </CardContent>
        </Card>

        <div className="content-wrapper py-16 sm:py-24">
          <div className="flex flex-wrap justify-center gap-y-8 gap-x-6">
            {contactUs.map((card) => (
              <div
                  key={card.title}
                  className="flex-grow max-w-md"
              >
                <div className="inline-flex items-center gap-2 py-8 w-full h-full">
                  <Card className={cn("overflow-hidden flex flex-col w-full", cardVariants({ variant: "default" }), "h-full")}>
                    <CardContent className="flex flex-col h-full px-6 mx-2">
                      <div className="relative border-b border-neutral-300">
                        <CardHeader className="flex flex-row gap-4 items-center">{card.icon}{card.title}</CardHeader>
                      </div>
                      <CardTitle className="text-lg py-6 px-6 flex-grow">{card.description}</CardTitle>
                      <div className="px-6 mt-auto">
                        <Button variant="primary_filled" size="xl">{card.buttonText}</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* Office Hours */}
      <section className="content-wrapper py-24 bg-gray-100">
        <SectionHeader title="Office Hours" align="center" />
        <Card className="w-full border-none shadow-none rounded-none">
          <CardContent className="max-w-[1440px] mx-auto max-h-[600px] flex items-center px-6 py-10">
            <p className="text-black text-xl">
              The Center for Computation and Visualization (CCV) staff members will be available to answer questions about Brown's research computing resources (Oscar, Stronghold, Globus) and help high-performance computing (HPC) issues.
              <br/><br/>
              The Computational Biology Core (CBC) staff are available at office hours to provide help with experimental design, data processing pipelines, and data analysis of high-throughput sequencing data. While we specialize in computational biology, all are welcome to join us with their questions.
            </p>
          </CardContent>
        </Card>
        <div>

        <div className="content-wrapper py-16 sm:py-24">
          <div className="flex flex-wrap justify-center gap-y-8 gap-x-6">
            {officeHours.map((card) => (
              <div
                  key={card.title}
                  className="flex-grow max-w-md"
              >
                  <div className="inline-flex items-center gap-2 py-8 w-full h-full">
                      <Card className={cn("overflow-hidden flex flex-col w-full", cardVariants({ variant: "default" }), "h-full")}>
                          <CardContent className="flex flex-col h-full">
                              <div className="relative border-b border-neutral-900 px-4 flex justify-center">
                                  <CardHeader className="text-center">{card.title}</CardHeader>
                              </div>
                              <CardDescription className="pt-4 text-xl text-center">{card.subtitle}</CardDescription>
                              <CardTitle className="text-lg py-6 text-center flex-grow" dangerouslySetInnerHTML={{ __html: card.description }} />
                              <div className="flex justify-center mt-auto">
                                  <Button variant="primary_filled" size="xl">{card.buttonText}</Button>
                              </div>
                          </CardContent>
                      </Card>
                  </div>
              </div>
            ))}
          </div>
        </div>

        </div>
      </section>

      {/* 180 George St */}
      <div className="content-wrapper py-16 sm:py-24">
        <Card className="w-full border-none shadow-none rounded-none">
          <CardContent className="max-w-[1440px] mx-auto max-h-[600px] flex items-center px-6 py-10">
            <div className="w-1/2">
              <SectionHeader title="180 George St" align="center" />
              <p className="text-black text-xl">
                Our office is on Brown's main campus in Providence's College Hill neighborhood.
                <br/><br/>
                Built in 1960 and dedicated to Thomas J. Watson in 1961, the building was designed by architect Philip Johnson to house the IBM 7070 computer.
                <br/><br/>
                Today, it hosts the Center for Computation and Visualization, supporting research at Brown.
              </p>
            </div>
            <div> 
              {/* map goes here */}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}