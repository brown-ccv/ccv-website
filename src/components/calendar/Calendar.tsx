"use client";

import { useState } from "react";
import CalendarEvent from "@/components/calendar/CalendarEvent";
import { useGetEventData } from "@/hooks/events";

export interface DataProps {
  date_time: string;
  date: string;
  title: string;
  date_utc: string;
  url: string;
  contact_info: string;
  description: string;
  description_long: string;
}

const Calendar = () => {
  const [view, setView] = useState("upcoming");
  const data = useGetEventData();

  if (!data) return <p>No event data</p>;

  return (
    <section className="container px-2 my-6">
      <div className="hidden min-h-8 relative lg:block">
        <div className="toggle-btn">
          <p
            id="week"
            className={view === "weekly" ? "selected" : ""}
            onClick={() => setView("weekly")}
          >
            Weekly
          </p>
          <p
            id="month"
            className={view === "monthly" ? "selected" : ""}
            onClick={() => setView("monthly")}
          >
            Monthly
          </p>
          <p
            id="upcoming"
            className={view === "upcoming" ? "selected" : ""}
            onClick={() => setView("upcoming")}
          >
            Upcoming
          </p>
        </div>
      </div>

      <div className="flex flex-wrap justify-between gap-4">
        {data &&
          data.map((event: DataProps) => {
            return (
              <div
                key={`${event.date_time}-${event.contact_info}-${event.title}`}
              >
                <CalendarEvent data={event} />
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default Calendar;
