

  import { Fragment, useEffect, useState, useRef } from "react";

import { ChevronLeft, ChevronRight } from "heroicons-react";
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
  parse
} from "date-fns";


  function classNames(...classes:any) {
    return classes.filter(Boolean).join(' ')
  }


  interface Props {
    ActiveMonth:any,ChangeMonth:any,shortWeekDaysArray:any,StartofMonth:any,ChangeDate:any,events:any
}

export default function CalendarDisplay(props:any) {
  var [Dates, setDates] = useState<any[]>([]);

    var ActiveMonth=props.ActiveMonth
    var ChangeMonth=props.ChangeMonth
    var shortWeekDaysArray=props.shortWeekDaysArray
    var StartofMonth=props.StartofMonth
    var ChangeDate=props.ChangeDate
    var events=props.events

    console.log(ActiveMonth)


    useEffect(() => {

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
      setDates(days);

    }
    
    },[ActiveMonth]);




    



    function blankspace(StartofMonth:any){
        var comp = []
        for(var i =1;i<Number(StartofMonth);i++){
          comp.push(<button></button>)
        }
        
        return(
          <>
            {comp.map(com=>
              <>{com}</>
              )}
        </>
        )
      }
    return (
      <>

<div className="hidden w-1/2 max-w-md flex-none border-l border-gray-100 py-10 px-8 md:block">
                    <div className="flex items-center text-center text-gray-900">
                    <button
                        type="button"
                        className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-calendarblue hover:text-gray-500"
                    >
                        <span className="sr-only">Previous month</span>
                        <ChevronLeft onClick={()=>ChangeMonth('subtract')} className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <div className="flex-auto font-semibold text-black">{format(ActiveMonth,'MMMM y')}</div>
                    <button
                        type="button"
                        className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-calendarblue hover:text-gray-500"
                    >
                        <span className="sr-only">Next month</span>
                        <ChevronRight onClick={()=>ChangeMonth('add')}  className="h-5 w-5" aria-hidden="true" />
                    </button>
                    </div>
                    <div className="mt-6 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
                    {shortWeekDaysArray.map((dayhead:any)=>
                    <>
                    <div key={dayhead} className='bg-calendarblue text-white'>{dayhead}</div>
                        </>
                    )}
                    </div>
                    <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 border border-calendarblue text-sm shadow ring-1 ring-gray-200">
                    {blankspace(StartofMonth)}

                    {Dates.map((day:any, dayIdx:any) => (
                        <button
                        key={day.date}
                        type="button"
                        className={classNames(
                            'py-1.5 hover:bg-gray-100 focus:z-10 border-2',
                            day.isCurrentMonth ? 'bg-white' : 'bg-gray-50',
                            day.isToday && 'bg-gray-500',

                            (day.isSelected || day.isToday) && 'font-semibold ',
                            day.isSelected && 'text-white',
                            !day.isSelected && day.isCurrentMonth && !day.isToday && 'text-gray-900',
                            !day.isSelected && !day.isCurrentMonth && !day.isToday && 'text-gray-400',
                            day.isToday && !day.isSelected && 'text-white',
                            day.Events > 0 &&   !day.isToday && !day.isSelected && 'text-litecalendarblue font-semibold',
                            day.isSelected && 'bg-calendarblue',
                            day.Events > 0 && day.isSelected && 'text-white',

                            day.isSelected && day.isToday && 'bg-calendarblue',
                            day.isSelected && !day.isToday && 'bg-calendarblue',

                            dayIdx === 0 && 'rounded-tl-lg',
                            dayIdx === 6 && 'rounded-tr-lg',
                            dayIdx === Dates.length - 7 && 'rounded-bl-lg',
                            dayIdx === Dates.length - 1 && 'rounded-br-lg'
                        )}
                        onClick={()=>ChangeDate( new Date(day.date))}
                        >
                        <time
                            dateTime={day.date}
                            className={classNames(
                            'mx-auto flex h-7 w-7 items-center justify-center rounded-full',
                            day.isSelected && !day.isToday && 'bg-calendarblue',
                            day.isSelected && day.isToday && 'bg-calendarblue'

                            )}
                        >
                            {day.date.split('/')[1].replace(/^0/, '')}
                        </time>
                        </button>
                    ))}
                    </div>
                </div>


      </>
    );
  }