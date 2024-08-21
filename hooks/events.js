import { useEffect, useState } from "react";
import { getStringDate } from "@/utils";

export function useGetEventData() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const currentDate = new Date();
  const today = getStringDate(
    currentDate.getMonth() + 1,
    currentDate.getDate(),
    currentDate.getFullYear(),
  );

  useEffect(() => {
    fetch(
      `https://events.brown.edu/live/json/events/description_long/true/group/Center%20for%20Computation%20and%20Visualization%20%28CCV%29/start_date/${today}/`,
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      });
  });
  return { data, isLoading };
}
