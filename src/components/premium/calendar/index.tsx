import { Fragment, useEffect, useState, useRef } from "react";

import { Menu, Transition } from "@headlessui/react";
import {
  compareAsc,
  format,
  endOfDay,
  getDaysInMonth,
  startOfMonth,
  startOfISOWeek,
  addDays,
  setDate,
  getMonth,
  getYear,
  addMonths,
  subMonths,
} from "date-fns";
import parse from "date-fns/parse";

import { da } from "date-fns/locale";
import sub from "date-fns/sub";
import add from "date-fns/add";
import { ChevronLeft, ChevronRight } from "heroicons-react";
import BothView from "./bothview";

interface Props {

  events:any,
  city:any,
  subscription:any,
}
  export default function Calendar(props:any) 
  {
    var events=props.events
    var city=props.city
    var subscription=props.subscription

    const [FullEvents, setFullEvents] = useState<any[]>(events);


  
    var [Datetouse, setDatetouse] = useState(new Date());
    var [DayorWeek, setDayorWeek] = useState("Day");

    var [ExpandAll, setExpandAll] = useState(false);
  
    var [MainDate, setMainDate] = useState(new Date());

    
    return (
        <div className="flex h-full flex-col mb-20">
        <div className="text-center text-2xl md:text-4xl text-calendarblue mt-20 mb-4">
          <div> {city.name} Business Events</div>
        </div>

        <div className="flex flex-auto overflow-hidden bg-white">

            <BothView
              events={FullEvents}
              city={city}
              MainDate={MainDate}
              setMainDate={setMainDate}
              subscription={subscription}
            />


        </div>
      </div>
    );
  }