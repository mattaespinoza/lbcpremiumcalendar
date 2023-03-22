import { Fragment, useEffect, useState, useRef } from "react";

import { Menu, Transition } from "@headlessui/react";
import PremiumEvents from "./premiumevents";
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
import CalendarDisplay from "./calendardisplay";
import { ChevronLeft, ChevronRight } from "heroicons-react";

interface Props {

  events:any,
  city:any
}
  export default function Calendar(props:any) 
  {
    var events=props.events
    var city=props.city

    var [Datetouse, setDatetouse] = useState(new Date());
    var [DayorWeek, setDayorWeek] = useState("Day");
    var [ActiveMonth, setActiveMonth] = useState(new Date());
    var [StartofMonth, setStartofMonth] = useState(
      format(startOfMonth(ActiveMonth), "i")
    );
    var [DatesforCal, setDatesforCal] = useState<any[]>([]);
    var [ExpandAll, setExpandAll] = useState(false);
  
  
    function ChangeDate(value:any) {
      console.log(value)
      if (value == "subtract") {
        var datetosub = sub(Datetouse, { days: 1 });
  
        if (format(datetosub, "MM") !== format(ActiveMonth, "MM")) {
          setActiveMonth(subMonths(ActiveMonth, 1));
          setStartofMonth(format(startOfMonth(subMonths(ActiveMonth, 1)), "i"));
  
          var days = [];
          var daysinmonth = Number(getDaysInMonth(subMonths(ActiveMonth, 1)));
          for (var i = 1; i <= daysinmonth; i++) {
            var result = new Date(
              getYear(subMonths(ActiveMonth, 1)),
              getMonth(subMonths(ActiveMonth, 1)),
              i
            );
            if (i == daysinmonth) {
              var numofevents = events.filter(
                (event:any) => format(parse(event.start_date,  "yyyy-MM-dd", new Date()),'MM/dd/yyyy') == format(result, "MM/dd/yyyy")
              );
              days.push({
                date: format(result, "MM/dd/yyyy"),
                isCurrentMonth: true,
                isSelected: true,
                Events: numofevents.length,
              });
            } else {
              var numofevents = events.filter(
                (event:any) => format(parse(event.start_date,  "yyyy-MM-dd", new Date()),'MM/dd/yyyy') == format(result, "MM/dd/yyyy")
              );
              days.push({
                date: format(result, "MM/dd/yyyy"),
                isCurrentMonth: true,
                Events: numofevents.length,
              });
            }
            setDatesforCal(days);
          }
          console.log(datetosub)
          setDatetouse(datetosub);
          setDayorWeek("Day");
        } else {
          setDatetouse(sub(Datetouse, { days: 1 }));
          setDayorWeek("Day");
          var dateindex = DatesforCal.findIndex(
            (day1) =>
              day1.date === format(sub(Datetouse, { days: 1 }), "MM/dd/yyyy")
          );
          var newdatescal = DatesforCal;
          for (var i = 0; i < newdatescal.length; i++) {
            delete newdatescal[i]["isSelected"];
          }
          newdatescal[dateindex]["isSelected"] = true;
          setDatesforCal(newdatescal);
        }
      } else if (value == "add") {
        var datetoadd = add(Datetouse, { days: 1 });
  
        if (format(datetoadd, "MM") !== format(ActiveMonth, "MM")) {
          setActiveMonth(addMonths(ActiveMonth, 1));
          setStartofMonth(format(startOfMonth(addMonths(ActiveMonth, 1)), "i"));
  
          var days = [];
          var daysinmonth = Number(getDaysInMonth(addMonths(ActiveMonth, 1)));
          for (var i = 1; i <= daysinmonth; i++) {
            var result = new Date(
              getYear(addMonths(ActiveMonth, 1)),
              getMonth(addMonths(ActiveMonth, 1)),
              i
            );
            if (i == 1) {
              var numofevents = events.filter(
                (event:any) => format(parse(event.start_date,  "yyyy-MM-dd", new Date()),'MM/dd/yyyy') == format(result, "MM/dd/yyyy")
              );
              days.push({
                date: format(result, "MM/dd/yyyy"),
                isCurrentMonth: true,
                isSelected: true,
                Events: numofevents.length,
              });
            } else {
              var numofevents = events.filter(
                (event:any) => format(parse(event.start_date,  "yyyy-MM-dd", new Date()),'MM/dd/yyyy') == format(result, "MM/dd/yyyy")
              );
              days.push({
                date: format(result, "MM/dd/yyyy"),
                isCurrentMonth: true,
                Events: numofevents.length,
              });
            }
            setDatesforCal(days);
          }
  
          setDatetouse(datetoadd);
          setDayorWeek("Day");
        } else {
          setDatetouse(add(Datetouse, { days: 1 }));
          setDayorWeek("Day");
  
          var dateindex = DatesforCal.findIndex(
            (day1) =>
              day1.date === format(add(Datetouse, { days: 1 }), "MM/dd/yyyy")
          );
          var newdatescal = DatesforCal;
  
          for (var i = 0; i < newdatescal.length; i++) {
            delete newdatescal[i]["isSelected"];
          }
  
          newdatescal[dateindex]["isSelected"] = true;
  
          setDatesforCal(newdatescal);
        }
      } else if (value == "today") {
        var days = [];
        var daysinmonth = Number(getDaysInMonth(new Date()));
        for (var i = 1; i <= daysinmonth; i++) {
          var result = new Date(getYear(new Date()), getMonth(new Date()), i);
          if (format(result, "MM/dd/yyyy") == format(new Date(), "MM/dd/yyyy")) {
            var numofevents = events.filter(
              (event:any) =>format(parse(event.start_date,  "yyyy-MM-dd", new Date()),'MM/dd/yyyy') == format(result, "MM/dd/yyyy")
            );

            days.push({
              date: format(result, "MM/dd/yyyy"),
              isCurrentMonth: true,
              isToday: true,
              Events: numofevents.length,
            });
          } else {
            var numofevents = events.filter(
              (event:any) => format(parse(event.start_date, "yyyy-MM-dd", new Date()),'MM/dd/yyyy') == format(result, "MM/dd/yyyy")
            );

            days.push({
              date: format(result, "MM/dd/yyyy"),
              isCurrentMonth: true,
              Events: numofevents.length,
            });
          }
          setDatesforCal(days);
          setActiveMonth(new Date());
          setStartofMonth(format(startOfMonth(new Date()), "i"));
          setDatetouse(new Date());
        }
      } else {
        console.log(format(new Date(value),"MM/dd/yyyy"))
        if(DatesforCal.filter(date=> date.date == value).length > 0 ){
          setDatetouse(value);
          setDayorWeek("Day");
  
          var dateindex = DatesforCal.findIndex(
            (day1) => day1.date === format(value, "MM/dd/yyyy")
          );
          var newdatescal = DatesforCal;
    
          for (var i = 0; i < newdatescal.length; i++) {
            delete newdatescal[i]["isSelected"];
          }
    
          newdatescal[dateindex]["isSelected"] = true;
          setDatesforCal(newdatescal);        
        }

        else{
          setDatetouse(value);
          setDayorWeek("Day");
          var days = [];
          var daysinmonth = Number(getDaysInMonth(ActiveMonth));
          for (var i = 1; i <= daysinmonth; i++) {
            var result = new Date(
              getYear(ActiveMonth),
              getMonth(ActiveMonth),
              i
            );
            if (format(result, "MM/dd/yyyy") == format(new Date(), "MM/dd/yyyy")) {
              var numofevents = events.filter(
                (event:any) => format(parse(event.start_date, "yyyy-MM-dd", new Date()),'MM/dd/yyyy')== format(result, "MM/dd/yyyy")
              );
              days.push({
                date: format(result, "MM/dd/yyyy"),
                isCurrentMonth: true,
                isToday: true,
                Events: numofevents.length,
              });
            } else {
              var numofevents = events.filter(
                (event:any) => format(parse(event.start_date,  "yyyy-MM-dd", new Date()),'MM/dd/yyyy') == format(result, "MM/dd/yyyy")
              );
              days.push({
                date: format(result, "MM/dd/yyyy"),
                isCurrentMonth: true,
                Events: numofevents.length,
              });
            }
            {console.log(days)}
            setDatesforCal(days);
        }
      }

      }

    }
  
    function ChangeMonth(value:any) {
      if (value == "subtract") {
        setActiveMonth(subMonths(ActiveMonth, 1));
        setStartofMonth(format(startOfMonth(subMonths(ActiveMonth, 1)), "i"));
        setDatetouse(new Date());
        
        var days = [];
        var daysinmonth = Number(getDaysInMonth(subMonths(ActiveMonth, 1)));
        for (var i = 1; i <= daysinmonth; i++) {
          var result = new Date(
            getYear(subMonths(ActiveMonth, 1)),
            getMonth(subMonths(ActiveMonth, 1)),
            i
          );
          if (format(result, "MM/dd/yyyy") == format(new Date(), "MM/dd/yyyy")) {
            var numofevents = events.filter(
              (event:any) => format(parse(event.start_date, "yyyy-MM-dd", new Date()),'MM/dd/yyyy')== format(result, "MM/dd/yyyy")
            );
            days.push({
              date: format(result, "MM/dd/yyyy"),
              isCurrentMonth: true,
              isToday: true,
              Events: numofevents.length,
            });
          } else {
            var numofevents = events.filter(
              (event:any) => format(parse(event.start_date,  "yyyy-MM-dd", new Date()),'MM/dd/yyyy') == format(result, "MM/dd/yyyy")
            );
            days.push({
              date: format(result, "MM/dd/yyyy"),
              isCurrentMonth: true,
              Events: numofevents.length,
            });
          }
          {console.log(days)}
          setDatesforCal([...days]);





        }
        
      } else if (value == "add") {
        setActiveMonth(addMonths(ActiveMonth, 1));
        setStartofMonth(format(startOfMonth(addMonths(ActiveMonth, 1)), "i"));
  
        var days = [];
        var daysinmonth = Number(getDaysInMonth(addMonths(ActiveMonth, 1)));
        for (var i = 1; i <= daysinmonth; i++) {
          var result = new Date(
            getYear(addMonths(ActiveMonth, 1)),
            getMonth(addMonths(ActiveMonth, 1)),
            i
          );
          if (format(result, "MM/dd/yyyy") == format(new Date(), "MM/dd/yyyy")) {
            var numofevents = events.filter(
              (event:any) =>format(parse(event.start_date,  "yyyy-MM-dd", new Date()),'MM/dd/yyyy') == format(result, "MM/dd/yyyy")
            );
            days.push({
              date: format(result, "MM/dd/yyyy"),
              isCurrentMonth: true,
              isToday: true,
              Events: numofevents.length,
            });
          } else {
            var numofevents = events.filter(
              (event:any) => format(parse(event.start_date,  "yyyy-MM-dd", new Date()),'MM/dd/yyyy')== format(result, "MM/dd/yyyy")
            );
            days.push({
              date: format(result, "MM/dd/yyyy"),
              isCurrentMonth: true,
              Events: numofevents.length,
            });
          }
          setDatesforCal(days);
        }
      }
    }
  
    const container = useRef(null);
    const containerOffset = useRef(null);
    const firstDOW = startOfISOWeek(new Date());
    const shortWeekDaysArray = Array.from(Array(7)).map((e, i) =>
      format(addDays(firstDOW, i), "EEEEEE")
    );
  
    useEffect(() => {
      // Update the document title using the browser API
      var days = [];
      var daysinmonth = Number(getDaysInMonth(ActiveMonth));
      for (var i = 1; i <= daysinmonth; i++) {
        var result = new Date(getYear(new Date()), getMonth(new Date()), i);
        if (format(result, "MM/dd/yyyy") == format(new Date(), "MM/dd/yyyy")) {
          var numofevents = events.filter(
            (event:any) => format(parse(event.start_date,  "yyyy-MM-dd", new Date()),'MM/dd/yyyy')== format(result, "MM/dd/yyyy")
          );

          days.push({
            date: format(result, "MM/dd/yyyy"),
            isCurrentMonth: true,
            isToday: true,
            Events: numofevents.length,
          });
        } else {
          var numofevents = events.filter(
            (event:any) => format(parse(event.start_date,  "yyyy-MM-dd", new Date()),'MM/dd/yyyy') == format(result, "MM/dd/yyyy")
          );
          days.push({
            date: format(result, "MM/dd/yyyy"),
            isCurrentMonth: true,
            Events: numofevents.length,
          });
        }
        setDatesforCal(days);
      }
    }, [ActiveMonth, events]);
  
      
    
    return (
        <div className="flex h-full flex-col mb-20">
        <div className="text-center text-2xl md:text-4xl text-calendarblue mt-20 mb-4">
          <div> {city.name} Business Events</div>
        </div>
        <header className="relative z-20 flex flex-none items-center justify-between border-b border-gray-200 py-4 px-6 m-auto">
          <div className="flex items-center">
            {DayorWeek !== "Week" && (
              <div className="flex items-center rounded-md shadow-sm items-stretch ">
                <button
                  type="button"
                  className="m-2 p-2 rounded-md shadow-sm border-t border-b border-gray-300 bg-white  text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 hidden md:block"
                >
                  <span className="sr-only">Previous month</span>
                  <ChevronLeft
                    onClick={() => ChangeDate("subtract")}
                    className="h-5 w-5 "
                    aria-hidden="true"
                  />
                </button>
                <button
                  type="button"
                  className="m-2 p-2 flex items-center rounded-md shadow-sm md:items-stretch border-t border-b border-gray-300 bg-white px-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:relative md:block"
                  onClick={() => ChangeDate("today")}
                >
                  Today
                </button>
  
                <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
                <button
                  type="button"
                  className="m-2 p-2 rounded-md shadow-sm border-t border-b border-gray-300 bg-white  text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 hidden md:block"
                >
                  <span className="sr-only">Next month</span>
                  <ChevronRight
                    onClick={() => ChangeDate("add")}
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </button>
              </div>
            )}
  
            <div
              className="m-2 p-2 flex items-center rounded-md shadow-sm md:items-stretch border-t border-b border-gray-300 bg-white px-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:relative md:block"
              onClick={() => setDayorWeek("Week")}
            >
              Week
            </div>
  
            <div
              className=" p-2 flex items-center rounded-md shadow-sm md:items-stretch border-t border-b border-gray-300 bg-white px-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:relative md:block"
              onClick={() => setDayorWeek("Day")}
            >
              Day
            </div>
  
            <div
              className="m-2 p-2 flex items-center rounded-md shadow-sm md:items-stretch border-t border-b border-gray-300 bg-white px-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:relative md:block"
              onClick={() => setExpandAll(!ExpandAll)}
            >
              Expand All
            </div>
          </div>
        </header>
        <div className="flex flex-auto overflow-hidden bg-white">
          <div
            ref={container}
            className="flex flex-auto flex-col overflow-auto pb-4"
          >
            {/* <MobileCalendarDisplay/>     */}
  
            {/* Horizontal lines */}
            {DayorWeek == "Day" && (
              <PremiumEvents
                events={events}
                city={city}
                date={Datetouse}
                type="Day"
                ChangeDate={ChangeDate}
                ExpandAll={ExpandAll}
              />
            )}
            {DayorWeek == "Week" && (
              <PremiumEvents
                events={events}
                city={city}
                date={new Date()}
                type="Week"
                ChangeDate={ChangeDate}
                ExpandAll={ExpandAll}
              />
            )}
          </div>
          <CalendarDisplay
            ActiveMonth={ActiveMonth}
            ChangeMonth={ChangeMonth}
            shortWeekDaysArray={shortWeekDaysArray}
            StartofMonth={StartofMonth}
            events={events}
            setDatesforCal={setDatesforCal}

            ChangeDate={ChangeDate}
          />
        </div>
      </div>
    );
  }