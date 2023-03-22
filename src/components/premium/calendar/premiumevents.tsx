
  import format from "date-fns/format";
  import parse from "date-fns/parse";
  import { useState, useEffect } from "react";
  import DayView from "./dayview";
  import WeekView from "./weekview";
  import Link from "next/link";
  import { atcb_action } from "add-to-calendar-button";

  interface Props {

  events:any,
  city:any,
  date:any,
  type:any,
  ChangeDate:any,
  ExpandAll:any}

  export default function PremiumEvents(
    props:any
  ) 
  {
    var events=props.events
    var city=props.city
    var date=props.date
    var type=props.type
    var ChangeDate=props.ChangeDate
    var ExpandAll=props.ExpandAll



    const [name, setName] = useState("");
    const [ShowExpand, setShowExpand] = useState(false);
    const [currentIndex, setcurrentIndex] = useState("");
    const [FullEvents, setFullEvents] = useState<any[]>([]);
    const [name1, setName1] = useState("Some event");
  
    const [Open, setOpen] = useState(false);
    useEffect(() => {
      for (var i = 0; i < events.length; i++) {
        events[i]["show"] = false;
      }
  
      events.sort(function (events1:any, events2:any) {
        if (events1.start_date > events2.start_date) return 1;
        if (events1.start_date < events2.start_date) return -1;
        if (events1.start_time > events2.start_time) return 1;
        if (events1.start_time < events2.start_time) return -1;
      });
  
      setFullEvents(events);
    }, [date, events]);
  
    useEffect(() => {
      var events2 = events;
      if (ExpandAll == true) {
        for (var i = 0; i < events2.length; i++) {
          events2[i]["show"] = true;
        }
      }
      if (ExpandAll == false) {
        for (var i = 0; i < events2.length; i++) {
          events2[i]["show"] = false;
        }
      }
      setFullEvents([...events2]);
    }, [ExpandAll, events]);
  
    function setShow(index:any) {
      var events2 = FullEvents;
  
      if (events2[index]["show"] == true) {
        events2[index]["show"] = false;
        setFullEvents([...events2]);
      } else if (events2[index]["show"] == false) {
        events2[index]["show"] = true;
        setFullEvents([...events2]);
      }
    }
  
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
                  {/* <div className="inline-block mt-4  text-calendarblue font-bold">
                      Hosted By:
      </div>*/}
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
                    {/*<Link className="text-litecalendarblue font-semibold" href={`/`+city.slug+`/event/${event.permalink}`}>
                        Show More Details
      </Link>*/}
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
                  <Link target="_blank" rel="noopener noreferrer" href={event.website}>
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

    return (
        <>
        {type == "Day" && (
          <>
            <DayView
              events={FullEvents}
              ChangeDate={ChangeDate}
              date={date}
              setShow={setShow}
              expandArea={expandArea}
              city={city}
            />
          </>
        )}
  
        {type == "Week" && (
          <>
            <WeekView
              events={FullEvents}
              ChangeDate={ChangeDate}
              date={date}
              setShow={setShow}
              expandArea={expandArea}
              city={city}

            />
          </>
        )}
      </>
    );
  }