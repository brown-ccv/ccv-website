import React from "react";
import { DataProps } from "@/components/calendar/Calendar";

interface EventProps {
  data: DataProps;
}

const CalendarEvent: React.FC<EventProps> = ({ data }) => {
  const descriptionLong = data.description_long.replace(/<(.|\n)*?>/g, "");
  const dateTime = new Date(data.date_utc.replace(/-/g, "/"));
  const normalDate =
    new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(dateTime) +
    ", " +
    data.date;
  return (
    <div className="bg-gray flex gap-6 overflow-hidden column min-w-[30ch]">
      <div className="event">
        <div className="text-neutral-900 text-sm">{normalDate}</div>
        <div>
          <a
            className="text-xl font-bold text-secondary-blue-500 no-underline leading-4"
            href={data.url}
            target="_blank"
          >
            {data.title}
          </a>
        </div>
        <div className="text-primary-500 text-xs">{data.date_time}</div>
        <div className="py-2">
          {data.description_long && <p>{descriptionLong}</p>}
        </div>
      </div>
    </div>
  );
};

export default CalendarEvent;
