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
  return (
    <div id="table-scrollable" className="table-scrollable is-hidden-mobile">
      <table>
        <thead>
          <tr>
            {}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/*<Week*/}
          {/*    v-for="i in weeksInDisplay"*/}
          {/*:key="'week-' + i"*/}
          {/*:info="info"*/}
          {/*:display-year="displayYear"*/}
          {/*:display-month="displayMonth"*/}
          {/*:display-week="displayDates()[i - 1]"*/}
          {/*:todays-date="todaysDate"*/}
          {/*:view="view"*/}
          {/*/>*/}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
