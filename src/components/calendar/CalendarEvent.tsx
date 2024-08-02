import React from "react";
import { DataProps } from "@/components/calendar/Calendar";

const CalendarEvent: React.FC<DataProps> = ({
  date_time,
  title,
  url,
  date,
  date_utc,
  description_long,
}) => {
  const descriptionLong = description_long.replace(/<(.|\n)*?>/g, "");
  const dateTime = new Date(date_utc.replace(/-/g, "/"));
  const normalDate =
    new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(dateTime) +
    ", " +
    date;
  return (
    <div className="bg-gray flex gap-6 overflow-hidden column min-w-[30ch]">
      <div className="event">
        <div className="text-neutral-900 text-sm">{normalDate}</div>
        <div>
          <a
            className="text-xl font-bold text-secondary-blue-500 no-underline leading-4"
            href={url}
            target="_blank"
          >
            {" "}
            {title}{" "}
          </a>
        </div>
        <div className="text-primary-500 text-xs">{date_time}</div>
        <div className="py-2">
          {description_long && <p>{descriptionLong}</p>}
        </div>
      </div>
    </div>
  );
};

export default CalendarEvent;
