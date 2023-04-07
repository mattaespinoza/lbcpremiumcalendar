
  import React, { useState,useEffect } from 'react';

  import format from "date-fns/format";
  import parse from "date-fns/parse";
import { ChevronDown, ChevronLeft, ChevronRight, Filter } from 'heroicons-react';
import Filters from '@/components/premium/calendar/filters';
import DayWeekFilter from './dayweekfilter';
import { fromUnixTime } from 'date-fns';
import CalendarDisplay from "./calendardisplay";
import { atcb_action } from "add-to-calendar-button";

import {
  compareAsc,
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
import Link from "next/link";
import { eventNames } from 'process';

interface Props {
    events: any;
    date: any;
    ChangeDate:any;    
    city:any;
    type:any;
    MainDate:any;
    setMainDate:any;


  }
  export default function BothView(props:any) 
  {
    var events=props.events
    var city =props.city
    var type =props.type
    var MainDate = props.MainDate
    var setMainDate = props.setMainDate
    var [DatesforCal, setDatesforCal] = useState<any[]>([]);
    var [ActiveMonth, setActiveMonth] = useState(new Date());

    const firstDOW = startOfISOWeek(new Date());
    const shortWeekDaysArray = Array.from(Array(7)).map((e, i) =>
      format(addDays(firstDOW, i), "EEEEEE")
    );
    

    var [CurrentFilters,setCurrentFilters] = useState<any[]>([])
    var [CurrentEvents,setCurrentEvents] = useState<any[]>(events)
    var [FEvents,setFEvents] = useState<any[]>(events)
    var [DayorWeek,setDayorWeek] = useState('Day')

    var [DateLabel,setDateLabel] = useState<any[]>([])
    var [StartofMonth, setStartofMonth] = useState(
      format(startOfMonth(new Date()), "i")
    );
    var events2 = events
    var events4=events
    var events3=[]

    function eventbody(event:any) {
      return `Take a look at this event from ${
        event.city_calendar
      } Business Calendar: %0D%0A%0D%0A
      %0D%0ATitle: ${event.name}
      %0D%0A%0D%0ADate and Time: ${ format(parse(event.start_date, "yyyy-MM-dd", new Date()),'MM/dd/yyyy')} @ ${format(
        parse(event.start_time, "HH:mm", new Date()),
        "h:mm a"
      )}
      %0D%0A%0D%0ADescription: ${event.description}
      %0D%0A%0D%0ALink: https://localbusinesscalendars.com/${
        "/" + city.slug + "/event/" + event.permalink
      }
    
      `;
    }

    useEffect(() => {
        var events4 = FEvents
        for(var i=0;i<FEvents.length;i++){
          events4[i]['show']=false
        }
        setFEvents([...events4])
  
       },[]);
    
    useEffect(() => {
        console.log(events)
        if(DayorWeek == 'Day'){
            events3= FEvents.filter((event:any)=>event.start_date == format(MainDate,'yyyy-MM-dd'))
            setDateLabel([...Array.from(new Set(events3.map((event:any) => event.start_date)))])

            setCurrentEvents(events3)
        }
    
        else if(DayorWeek == 'Week'){
            events3= FEvents
            var dateform=[...Array.from(new Set(events3.map((event:any) => event.start_date))).sort((a, b) => a > b ? 1 : -1)] 


            setDateLabel(dateform)
            setCurrentEvents(events3)
            
    
         }
        },[DayorWeek,MainDate]);

    useEffect(() => {
        events3=[]
        if(CurrentFilters.length == 0){
            events3 = events
        } 
        else if(CurrentFilters.length> 0){
        for(var i =0;i<CurrentFilters.length;i++){

          
        if(CurrentFilters[i]['type'] == 'Event Type'){
            events4= events2.filter((events1: { event_type: any[]; })=>events1.event_type !== null)

            events3.push(...events4.filter((events1: { event_type: any[]; })=>events1.event_type.includes(CurrentFilters[i]['name'])))
        }

        else if(CurrentFilters[i]['type'] == 'Group Type'){
            events4= events2.filter((events1: { group_type: any[]; })=>events1.group_type !== null)

            events3.push(...events4.filter((events1: { group_type: any[]; })=>events1.group_type.includes(CurrentFilters[i]['name'])))
        }
        }
        }
        setCurrentEvents(events3)

    },[CurrentFilters]);

    function expandArea(event:any) {
      return (
        <>
          <div className="mt-4 col-span-6 align-bottom bg-gray-100 rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transform transition-all  sm:align-middle text-sm lg:text-base">
            <div className="mt-4 mb-4 grid grid-cols-3 ">
              <div className="col-span-3 lg:col-span-2">
                <div>
                  <div className="mt-2  inline-block">
                    <div className="font-bold inline-block text-calendarblue">
                      Date/Time:
                    </div>
                    <div className="inline-block  ml-2 font-normal text-black">
                      { format(parse(event.start_date,  "yyyy-MM-dd", new Date()),'MM/dd/yyyy')} at @ {event.start_time}
                    </div>
                  </div>
                  <div className="block">
                    <div className="inline-block mt-4  text-calendarblue font-bold">
                      Hosted By:
                    </div>
                    <div className="inline-block ml-2 font-normal text-black">
                      {event.group_name}
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className=" font-bold text-calendarblue inline-block">
                    Description:
                  </div>
                  <div className=" inline-block ml-2 font-normal text-black">
                    <div>{event.description.substring(0, 250)}...</div>
                    <Link className="text-litecalendarblue font-semibold" href={`/`+city.slug+`/event/${event.permalink}`}>
                        Show More Details
                      
                    </Link>
                  </div>
                </div>
              </div>
  
              <div className="inline-block col-span-2 lg:col-span-1 justify-self-end">
                {/*<button className='block m-2 p-2 bg-newnewblue text-white' onClick={() => window.open(`mailto:support@example.com?subject=Check%20Out%20This%20Event%20from%20SABusinessCalendar.com&body=${sharedeventencode}`) }
                      title="support@example.com"> Share </button>     
                <div className="block m-2 p-2 w-32 text-sm text-center bg-calendarblue text-white font-normal">
                  Add to Calendar
                </div>
                  */}
                {/*} <div className='block m-2 p-2 bg-newnewblue text-white'> <AddToCalendar event={sampevent}/></div>*/}
                <button className="block m-4 p-2 w-24 md:w-32 text-center text-sm bg-calendarblue text-white">
                  <Link href={event.website} target="_blank">
                      Website
                  
                  </Link>
                </button>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();



                    atcb_action({
                      name: event.name,
                      description:
                        event.description +
                        `\n\nWebsite: [url]${event.website}[/url]
                        \n\nDisclaimer: Please check the original event listing for correct time length of this event.
                        
                        `,
  
                      startDate: format(
                        parse(event.start_date, "yyyy-MM-dd", new Date()) ,
                        "yyyy-MM-dd"
                      ),
                      endDate: format(
                        parse(event.start_date,  "yyyy-MM-dd", new Date()) ,
                        "yyyy-MM-dd"
                      ),
                      startTime: event.start_time,
                      endTime: event.start_time,
                      timeZone: "America/Chicago",
                     options: [
                        "Apple",
                        "Google",
                        "iCal",
                        "Microsoft365",
                        "Outlook.com",
                        "MicrosoftTeams",
                        "Yahoo",
                      ],
                      trigger: "click",
                      iCalFileName: "Reminder-" + event.name,
                    });
                  }}
                >
                  <div className="block m-4 p-2 w-24 md:w-32 m-4 text-center text-xs bg-calendarblue text-white">
                    <input
                      className="atcb_customTrigger"
                      type="submit"
                      value="Add to Calendar"
                    />
                  </div>
                </form>
                      <div className="m-4">
                <button
                  className="block p-2 w-24 md:w-32 text-center text-sm bg-calendarblue text-white"
                  onClick={() =>
                    window.open(
                      `mailto:?subject=Check%20Out%20This%20Event%20from%20` +
                        event.city_calendar +
                        `%20Business%20Calendar&body=${eventbody(event)}`
                    )
                  }
                  title="Check Out This Event"
                >
                  Share
                </button>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }


    function setShow(event:any) {
      var events2 = FEvents;
      var findex =  (element:any) => element.id == event.id;
      findex = events.findIndex(findex)
      console.log(findex)

      if (events2[Number(findex)]["show"] == true) {
        events2[Number(findex)]["show"] = false;
        setCurrentEvents([...events2]);
      } else if (events2[Number(findex)]["show"] == false) {
        events2[Number(findex)]["show"] = true;
        setCurrentEvents([...events2]);

      }
      
    }


    return (  
      <>
      
      <div
            className="flex flex-auto flex-col overflow-auto pb-4" ><DayWeekFilter DayorWeek={DayorWeek} setDayorWeek={setDayorWeek}/>
      <div className='grid grid-cols-3'><button className="bg-calendarblue text-white text-sm rounded m-2 col-span-1 p-2 lg:w-40  h-1/2 m-auto "> Send Selected Events</button>
        <div className='col-span-2'><Filters setCurrentFilters={setCurrentFilters} CurrentFilters={CurrentFilters}/></div>
        </div> 
        {(DateLabel.length == 0)  && (
            <>
            <div className="text-center bg-calendarblue  p-2 font-bold text-white md:mb-8 mb-2 ">
            <div className="inline-block ml-2 mr-2 text-xl md:text-2xl w-72 md:w-96">
            There's no events for this date {format(new Date(),'MM/dd/yyyy')}
            </div></div>
            </>

        )}
        {DateLabel.slice(0, 7).map(date=>
           <>

                {CurrentEvents.filter(event=>event.start_date == date).sort((a, b) => a.start_time > b.start_time ? 1 : -1).map((event,index)=>
                             <>
                             {index ==0 && (
                                <div key={event.id} className="text-center bg-calendarblue  p-2 font-bold text-white md:mb-8 mb-2 ">
                                <div className="inline-block ml-2 mr-2 text-xl md:text-2xl w-72 md:w-96">
                                
                                {format( parse(date,  "yyyy-MM-dd", new Date()), "EEEE, MMMM do ")}
                                </div>
                                </div>
                            )}
                             <div
                              className={
                                index % 2 === 0
                                  ? "text-calendarblue cursor-pointer md:pb-2"
                                  : "text-black cursor-pointer md:pb-2"
                              }
                            > 
                              <div
                                key={event._id}
                                className="grid grid-cols-8 border-t-2 text-xl pt-2 md:p-2"
                              > 
                                <div className="col-span-2 justify-self-center text-sm  md:text-base font-bold"><input className="mr-4" type={'checkbox'}/>
                                  {format(
                                    parse(event.start_time, "HH:mm", new Date()),
                                    "h:mm a"
                                  )}
                                </div>
                                <div className="col-span-6 grid grid-cols-4 text-lg font-normal ">
                                  <div
                                  className="col-span-6 md:col-span-3 text-base md:text-xl"
                                  onClick={() =>setShow(event)}
                                  >
                                    {event.name}
                                  </div>
                                  <div
                                    onClick={() => setShow(event)}
                                    className="col-span-1 justify-self-end font-normal invisible md:visible"
                                  >
                                    More
                                    <ChevronDown
                                      className="inline-block h-6 w-6"
                                      aria-hidden="true"
                                    />
                                  </div>
                                </div>
                                <div className="col-span-8 lg:col-span-7 lg:col-start-2">
                                  {event.show == true && expandArea(event)}
                                </div>
                              </div>
                            </div>
                            </>
                            )}

           </>
            )}
        </div>

          <CalendarDisplay
            shortWeekDaysArray={shortWeekDaysArray}
            StartofMonth={StartofMonth}
            events={events}
            setDatesforCal={setDatesforCal}
            MainDate={MainDate}
            setMainDate={setMainDate}
            ActiveMonth={ActiveMonth}
            setDayorWeek={setDayorWeek}

            />





      </>
    );
  }