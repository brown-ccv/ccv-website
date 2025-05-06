"use client"

import React from "react"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { GiDna2 } from "react-icons/gi"
import CBCBars from "@/components/assets/CBCBars"
import { Button } from "@/components/ui/button"

const request_access_url =
  "https://docs.google.com/forms/d/e/1FAIpQLSdJwbhtMznPjR6QrobBG1u-n3AMLnWdigN-NqFepsC7gbb2tw/viewform"

export const IPAScheduler = () => {
  return (
    <section className="mt-12 mb-12 md:mt-24 md:mb-24">
      <div className="flex justify-center items-center h-full w-full mx-2 px-4 sm:px-8 lg:px-24">
        <div className="flex flex-col lg:flex-row items-start justify-center w-full max-w-[2880px] gap-8 sm:gap-12 lg:gap-20">
          {/* Text Content */}
          <div className="w-full max-w-[721px] space-y-6 mt-0 md:mt-28">
            <Card className="border-none shadow-none">
              <CardTitle className="text-2xl p-6">
                <CBCBars />
                <h3 className="flex items-center text-[32px] pt-3">
                  <GiDna2 className="mr-3" /> Ingenuity Pathway Analysis
                  Scheduler
                </h3>
              </CardTitle>
              <CardContent className="pt-4 space-y-4 text-xl">
                <p>
                  IPA helps you identify biological mechanisms and pathways
                  relevant to your research data. Visualize, analyze, and
                  understand molecular interactions and disease on multiple
                  levels.
                </p>
                <div className="flex justify-center items-center p-2">
                  <Button
                    className="h-[55px] font-semibold"
                    variant="primary_filled"
                  >
                    <a
                      href={request_access_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Request Access to IPA
                    </a>
                  </Button>
                </div>
                <ul className="list-disc pl-6 space-y-2">
                  <h4 className="text-2xl font-semibold italic">Scheduling</h4>
                  <div className="flex flex-col items-start pl-6 space-y-2">
                    <li>
                      Only 1 concurrent user is allowed at a time. Please
                      reserve your analysis time using the scheduler.
                    </li>
                    <li>
                      Available times are displayed. You may reserve a maximum
                      two consecutive slots.
                    </li>
                  </div>

                  <h4 className="text-2xl font-semibold italic pt-4">
                    Getting Started
                  </h4>
                  <div className="flex flex-col items-start pl-6 space-y-2">
                    <li>
                      You will receive login details via email after
                      registration.
                    </li>
                    <li>
                      Allow a few minutes for the application to load upon your
                      first login. Make sure to disable pop-up blockers.
                    </li>
                  </div>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Calendar Embed */}
          <Card className="h-full w-full max-w-[1440px] border-none shadow-none">
            <CardContent className="p-0">
              <iframe
                src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0eowSuK_EFiBjR9YiMUALMFmO-m4lfu9784PpuSM6gy8OHVWb8dftEjMnrgQdYmvCeRn0vgUcQ?gv=true"
                style={{ border: "0" }}
                width="100%"
                height="1000"
                frameBorder="0"
              ></iframe>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
