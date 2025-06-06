import React from "react"
import { Hero } from "@/components/Hero"
import { TextAnimate } from "@/components/magicui/text-animate"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button";

export default async function FileStorage() {
    return (
      <div className="w-full">
        <div className="relative w-full flex flex-col">
          <div className="bg-purple-900">
            <Hero image={"/images/hero-subroutes.jpeg"}>
              <div className="relative flex-1 flex items-start w-full px-6 md:px-24 bg-gradient-to-t from-black/0 via-black/10 to-black/65 z-5">
                <div className="absolute top-[12%] flex flex-col text-white space-y-6">
                  <TextAnimate className="font-bold text-6xl md:text-8xl">
                    File Storage and Transfer
                  </TextAnimate>
                  <p className="text-4xl font-semibold">
                    Several services at Brown allow you to share and store files. This guide will let you compare the options and decide which are right for you.
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
                The Center for Computation and Visualization (CCV) is a center within the University&apos;s central IT organization, which is the Office of Information Technology (OIT). In addition to building and maintaining the University&apos;s hundreds of enterprise software, systems, and hardware, OIT is also responsible for driving the technological progress that enables scientific research. Executing on the University&apos;s research mission is the key role that CCV plays in OIT.
              </p>
            </CardContent>
          </Card>

          <div className="content-wrapper flex justify-center px-40">
            <div className="flex flex-wrap justify-center gap-y-6 gap-x-6 xs:w-1/2">
              {pageContent?.data?.contactUs?.map((card: ContactTypes) => (
                <div
                  key={card.title}
                  className="flex-grow max-w-lg"
                >
                  <div className="inline-flex items-center gap-2 w-full h-full">
                    <Card className={cn("overflow-hidden flex flex-col w-full", cardVariants({ variant: "default" }), "h-full")}>
                      <CardContent className="flex flex-col h-full px-6 mx-2">
                        <div className="relative border-b border-neutral-300">
                          <CardHeader className="flex flex-row gap-4 items-center">
                            <Icon iconName={card.icon}></Icon>
                            {card.title}
                          </CardHeader>
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

      </div>
    )
  }