"use client";

import { useState, useEffect } from "react";
import { getStringDate } from "@/utils";
import CalendarEvent from "@/components/calendar/CalendarEvent";

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
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const currentDate = new Date();
  const today = getStringDate(
    currentDate.getMonth() + 1,
    currentDate.getDate(),
    currentDate.getFullYear(),
  );

  useEffect(() => {
    fetch(
      "https://events.brown.edu/live/json/events/description_long/true/group/Center%20for%20Computation%20and%20Visualization%20%28CCV%29/start_date/" +
        today +
        "/",
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  });

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  return (
    <>
      <div className="flex flex-wrap justify-between gap-4">
        {data &&
          data.map((e: DataProps, i) => {
            return (
              <div key={i}>
                <CalendarEvent
                  date_time={e.date_time}
                  title={e.title}
                  url={e.url}
                  date={e.date}
                  date_utc={e.date_utc}
                  description_long={e.description_long}
                  contact_info={e.contact_info}
                  description={e.description}
                />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Calendar;
