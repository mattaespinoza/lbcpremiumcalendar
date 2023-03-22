
  import React, { useState } from 'react';

  import format from "date-fns/format";
  import parse from "date-fns/parse";
import { ChevronDown, ChevronLeft, ChevronRight } from 'heroicons-react';

interface Props {
    events: any;
    date: any;
    ChangeDate:any;    
    setShow:any,
    expandArea:any,
    city:any


  }
  export default function DayView(props:any) 
  {
    var events=props.events
    var date=props.date
    var ChangeDate=props.ChangeDate
    var setShow=props.setShow
    var expandArea=props.expandArea
    var city =props.city
  const [Data, setData] = useState<any[]>([]);



  
    function selecteddata(data:any){
      var data2 = Data
        data2.push(data)
      setData([...data2])
    }



    function sendEmail(){
      var body=''
      for(var i =0;i<Data.length;i++){
        body+=Data[i].name.replace(/&/g, '%26') + '%0D%0A' + 'Start Date: ' +  format(parse(Data[i].start_date,  "yyyy-MM-dd", new Date()),'MM/dd/yyyy') +' @ ' +Data[i].start_time + '%0D%0A' + 'Website: ' +window.location.host+'/'+city.slug+'/event/'+Data[i].permalink + '%0D%0A' +' %0D%0A%0D%0A'
        
      }

      
      window.open(
        `mailto:?subject=Here's%20some%20event(s)%20you%20might%20find%20interesting%20` +
          `&body=`+body
      )
      
    }
    return (
      <>          <button onClick={()=>sendEmail()} className="bg-calendarblue text-white w-44 p-2 rounded m-2 "> Send Selected Events</button>

        <div className="text-center bg-calendarblue  p-2 font-bold text-white md:mb-8 mb-2 ">
          <button
            type="button"
            className=" items-center justify-center rounded-l-md py-2 pl-4 pr-3 text-gwhite hover:text-litecalendarblue focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
            onClick={() => ChangeDate("subtract")}
          >
            <span className="sr-only">Previous month</span>
            <ChevronLeft className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="inline-block ml-2 mr-2 text-xl md:text-2xl w-72 md:w-96">
            {format(date, "EEEE, MMMM do ")}
          </div>
  
          <button
            type="button"
            className="items-center justify-end rounded-r-md py-2 pl-4 pr-3 text-white font-bold hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
            onClick={() => ChangeDate("add")}
          >
            <span className="sr-only">Next month</span>
            <ChevronRight className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        {events.filter(
          (event: { start_date: string; }) => format(parse(event.start_date,  "yyyy-MM-dd", new Date()),'MM/dd/yyyy') == format(date, "MM/dd/yyyy")
        ) == 0 && (
          <>
            <div className="grid grid-cols-8 border-t-2  pt-2 text-calendarblue  pb-2">
              <div className="col-span-1 justify-self-center text-lg font-bold"></div>
              <div className="col-span-7 grid grid-cols-4 text-lg font-normal ">
                <div className="col-span-3">No Events found for this date</div>
              </div>
            </div>
          </>
        )}
  
        {events.map((event:any,index:any) => (
          <>
            {events.length !== 0 && (
              <>
                {format(parse(event.start_date,  "yyyy-MM-dd", new Date()),'MM/dd/yyyy') == format(date, "MM/dd/yyyy") && (
                  <>
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
                        <div className="col-span-2 justify-self-center text-sm  md:text-base font-bold"><input onClick={()=>selecteddata(event)}className="mr-4" type={'checkbox'}/>
                          {format(
                            parse(event.start_time, "HH:mm", new Date()),
                            "h:mm a"
                          )}
                        </div>
                        <div className="col-span-6 grid grid-cols-4 text-lg font-normal ">
                          <div
                          className="col-span-6 md:col-span-3 text-base md:text-xl"
                          onClick={() => setShow(index)}
                          >
                            {event.name}
                          </div>
                          <div
                            onClick={() => setShow(index)}
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
          </>
        ))}
      </>
    );
  }