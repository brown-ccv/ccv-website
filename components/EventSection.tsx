// components/EventSection.tsx
"use client"

import { use, useState } from "react"
import CalendarEvent from "@/components/calendar/CalendarEvent"
import CalendarWeekly from "@/components/calendar/CalendarWeekly"
import CalendarMonth from "@/components/calendar/CalendarMonth"
import { Card, CardContent } from "@/components/ui/card"
import CCVBars from "@/components/assets/CCVBars"
import { FaCalendarAlt } from "react-icons/fa"
import { Button } from "@/components/ui/button"    // ← import your Button

const events_url = "https://events.brown.edu/ccv/all"

export interface DataProps { /* …same as before… */ }

function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}

interface EventSectionProps {
  streamedDataFuture: Promise<any>
  streamedDataPast: Promise<any>
  today: string
  currentDate: Date
}

export function EventSection({
  streamedDataFuture,
  streamedDataPast,
  today,
  currentDate,
}: EventSectionProps): JSX.Element {
  const dataFuture = use(streamedDataFuture)
  const dataPast   = use(streamedDataPast)
  const [view, setView] = useState<"Upcoming"|"Weekly"|"Monthly">("Upcoming")
  const CAL_VIEW_ARRAY = ["Upcoming","Weekly","Monthly"] as const

  return (
    <section className="px-6">
      {/* — Tabs — */}
      <div className="hidden min-h-8 relative lg:block mb-4">
        <div className="toggle-btn space-x-10">
          {CAL_VIEW_ARRAY.map((item) => {
            return (
              <p
                id={item}
                key={item}
                className={classNames(
                  view === item ? "selected" : "",
                  item === "Weekly" && "hidden lg:inline-block",
                  item !== "Weekly" && "inline-block",
                  "m-0 rounded-[13px] py-2 px-3"
                )}
                role="button"
                onClick={() => setView(item)}
              >
                {item}
              </p>
            )
          })}
        </div>
      </div>

      {/* — Upcoming view — */}
      {view === "Upcoming" && (
        <div className="grid grid-cols-1 [@media(min-width:1400px)]:grid-cols-[auto_1fr] gap-6 pt-4">
          {/* Left: Events card */}
          <div className="justify-self-start [@media(min-width:1400px)]:justify-self-center">
            <Card className="max-w-xs w-full border-none shadow-none my-auto">
              <CardContent className="mb-6 mt-6">
                <CCVBars />
                <h3 className="flex items-center font-semibold text-black text-[32px]">
                  <FaCalendarAlt className="mr-3" /> Events
                </h3>
                <p className="font-serif italic text-black text-xl mt-3 mb-3">
                  What’s next at CCV
                </p>
                <Button className="h-[55px] font-semibold" variant="primary_filled">
                  <a href={events_url} target="_blank" rel="noopener noreferrer">
                    View All Events
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right: event cards grid */}
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 [@media(min-width:1400px)]:grid-cols-4 gap-6">
              {dataFuture?.slice(0, 4).map((e, i) => (
                <CalendarEvent key={i} {...e} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* — Weekly view — */}
      {view === "Weekly" && (
        <div className="h-0 min-h-[768px] pt-4">
          <CalendarWeekly
            today={today}
            currentDate={currentDate}
            events={dataPast.concat(dataFuture)}
          />
        </div>
      )}

      {/* — Monthly view — */}
      {view === "Monthly" && (
        <div className="pt-4">
          <CalendarMonth
            today={today}
            currentDate={currentDate}
            events={dataPast.concat(dataFuture)}
          />
        </div>
      )}
    </section>
  )
}

export default EventSection
