import React from "react";
import Image from "next/image";
import { Hero } from "@/components/Hero";
import { TextAnimate } from "@/components/magicui/text-animate";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { cardVariants } from "@/components/ui/variants";
import { FaEnvelopeOpenText, FaTicketAlt, FaBookReader, FaSlack, FaMapMarkerAlt } from "react-icons/fa";

const officeHours = [
  {
    title: "Computational Biology Core",
    subtitle: "Join us remotely.",
    description: "TUESDAYS <br/><br/> 11am - 12pm <br/><br/><br/> WEDNESDAYS <br/><br/> 3pm - 4pm",
    buttonLinks: [{ text: "Find Zoom Link", href: "https://events.brown.edu/ccv/week" }],
  },
  {
    title: "Center for Computation and Visualization",
    subtitle: "Join us remotely or in-person.",
    description: "FRIDAYS <br/><br/> 10am - 12pm",
    buttonLinks: [{ text: "Find Zoom Link", href: "https://events.brown.edu/ccv/week" }],
  },
];

const contactUs = [
  {
    title: "Email",
    icon: <FaEnvelopeOpenText />,
    description: "Inquire about resources, support, or a potential collaboration for a research project.",
    buttonLinks: [{ text: "Email Us", href: "mailto:support@ccv.brown.edu" }],
  },
  {
    title: "Submit a Ticket",
    icon: <FaTicketAlt />,
    description: "Open a ticket with our user services team. We will respond as soon as possible.",
    buttonLinks: [{ text: "Submit a Ticket", href: "mailto:support@ccv.brown.edu" }],
  },
  {
    title: "Documentation",
    icon: <FaBookReader />,
    description: "View Documentation for CCV Services, such as for Stronghold, Oscar, or Globus.",
    buttonLinks: [{ text: "View the Docs", href: "https://docs.ccv.brown.edu/documentation" }],
  },
  {
    title: "CCV Slack",
    icon: <FaSlack />,
    description: "CCV Share is a collection of Slack channels where CCV Staff and the ocmmunity will be available to discuss your questions.",
    buttonLinks: [
      { text: "Join the Slack", href: "https://join.slack.com/t/ccv-share/shared_invite/enQtODY5OTQ3MTk0ODU1LTM4OWQyZjVlYWRmY2QxNWEyZjQ0NzEwMmRlNTRlZjYyMjM1Y2U5MDU1ZGFmMmRhZWIzNjliYmQzYTBiMzY2NzU" },
      { text: "Terms of Services", href: "/assets/Terms_of_Service_Slack.pdf" },
    ],
  },
];

export default async function ContactUs() {
  return (
    <div className="w-full">
      <div className="relative w-full flex flex-col">
        <div className="bg-purple-900">
          <Hero image={"/images/hero-subroutes.jpeg"}>
            <div className="relative flex-1 flex items-start w-full px-24 bg-gradient-to-t from-black/0 via-black/10 to-black/65 z-5">
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
      <section className="content-wrapper py-24 px-6 lg:px-36">
        <SectionHeader title="Contact Us" align="center" />
        <Card className="w-full border-none shadow-none rounded-none">
          <CardContent className="mx-auto flex items-center px-6">
            <p className="text-black text-xl pb-8">
              The Center for Computation and Visualization (CCV) is a center within the University's central IT organization, which is the Office of Information Technology (OIT). In addition to building and maintaining the University's hundreds of enterprise software, systems, and hardware, OIT is also responsible for driving the technological progress that enables scientific research. Executing on the University's research mission is the key role that CCV plays in OIT.
            </p>
          </CardContent>
        </Card>

        <div className="content-wrapper flex justify-center px-40">
          <div className="flex flex-wrap justify-center gap-y-6 gap-x-6 xs:w-1/2">
            {contactUs.map((card) => (
              <div
                key={card.title}
                className="flex-grow max-w-lg"
              >
                <div className="inline-flex items-center gap-2 w-full h-full">
                  <Card className={cn("overflow-hidden flex flex-col w-full", cardVariants({ variant: "default" }), "h-full")}>
                    <CardContent className="flex flex-col h-full px-6 mx-2">
                      <div className="relative border-b border-neutral-300">
                        <CardHeader className="flex flex-row gap-4 items-center">{card.icon}{card.title}</CardHeader>
                      </div>
                      <CardDescription className="text-lg px-6 flex-grow pt-4">{card.description}</CardDescription>
                      <div className="px-6 flex flex-col gap-2">
                        {card.buttonLinks && card.buttonLinks.map((link, index) => (
                          <Button
                            key={index}
                            variant="primary_filled"
                            size="xl"
                          >
                            <a href={link.href} target="_blank" rel="noopener noreferrer">{link.text}</a>
                          </Button>
                        ))}
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
      <section className="content-wrapper py-24 px-6 lg:px-36 bg-gray-100">
        <SectionHeader title="Office Hours" align="center" />
        <Card className="w-full border-none shadow-none rounded-none">
          <CardContent className="mx-auto flex items-center px-6">
            <p className="text-black text-xl">
              The Center for Computation and Visualization (CCV) staff members will be available to answer questions about Brown's research computing resources (Oscar, Stronghold, Globus) and help high-performance computing (HPC) issues.
              <br/><br/>
              The Computational Biology Core (CBC) staff are available at office hours to provide help with experimental design, data processing pipelines, and data analysis of high-throughput sequencing data. While we specialize in computational biology, all are welcome to join us with their questions.
            </p>
          </CardContent>
        </Card>
        <div>
          <section className="content-wrapper">
            <div className="flex flex-wrap justify-center gap-y-6 gap-x-6">
              {officeHours.map((card) => (
                <div
                  key={card.title}
                  className="flex-grow max-w-md"
                >
                  <div className="inline-flex items-center gap-2 py-8 w-full h-full">
                    <Card className={cn("overflow-hidden flex flex-col w-full h-full", cardVariants({ variant: "default" }))}>
                      <CardContent className="flex flex-col h-full">
                        <div className="relative border-b border-neutral-900 px-4 flex justify-center">
                          <CardHeader className="text-center">{card.title}</CardHeader>
                        </div>
                        <CardDescription className="pt-6 text-xl text-center">{card.subtitle}</CardDescription>
                        <CardTitle className="text-lg text-center flex-grow" dangerouslySetInnerHTML={{ __html: card.description }} />
                        <div className="flex justify-center mt-auto">
                          {card.buttonLinks && card.buttonLinks.map((link, index) => (
                            <Button key={index} variant="primary_filled" size="xl">
                              <a href={link.href} target="_blank" rel="noopener noreferrer">{link.text}</a>
                            </Button>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>

      {/* 180 George St */}
      <div className="content-wrapper px-0">
        <Card className="w-full shadow-none rounded-none border-none relative flex flex-col">
          <CardContent className="mx-auto flex items-center">
            <div className="w-full xl:w-full px-6 xl:px-36 xl:py-12">
              <SectionHeader title="180 George St" align="center" />
              <p className="text-black text-xl">
                Our office is on Brown's main campus in Providence's College Hill neighborhood.
                <br/><br/>
                Built in 1960 and dedicated to Thomas J. Watson in 1961, the building was designed by architect Philip Johnson to house the IBM 7070 computer.
                <br/><br/>
                Today, it hosts the Center for Computation and Visualization, supporting research at Brown.
              </p>
            </div>
            <div className="w-full xl:w-1/2 relative hidden xxl:block min-w-[800px]">
              <Image
                src={"/images/about/ccv-map.png"}
                alt="BrowserWindow"
                width={2000}
                height={1000}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <FaMapMarkerAlt className="z-20 text-6xl text-keppel-700" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}