import format from "date-fns/format";
import { parse } from "date-fns";
import { ChevronDown } from "heroicons-react";
import React, {Fragment,useState } from 'react';
import { Dialog, Disclosure, Menu, Popover, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronLeft, ChevronRight } from "heroicons-react";
import {

  addDays,
  subDays

} from "date-fns";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}


interface Props {
DayofWeek:any;
setDayorWeek:any;
changeDateLabel:any;
setMainDate:any;
MainDate:any;
setExpandAll:any;
ExpandAll:any;

}



  export default function DayWeekFilter(props:any) {
    var DayorWeek=props.DayorWeek
    var setDayorWeek=props.setDayorWeek
    var changeDateLabel=props.changeDateLabel
    var setMainDate=props.setMainDate
    var MainDate=props.MainDate
    var setExpandAll=props.setExpandAll
    var ExpandAll = props.ExpandAll

    return (
        <> 
        <header className="relative z-20 flex flex-none items-center justify-between border-b border-gray-200 py-4 px-6  bg-calendarblue">
          <div className="flex items-center m-auto">
            {DayorWeek !== "Week" && (
              <div className="flex items-center rounded-md shadow-sm items-stretch ">
                <button
                  type="button"
                  className="m-2 p-2 rounded-md shadow-sm border-t border-b border-gray-300 bg-white  text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 hidden md:block"
                  onClick={ ()=>setMainDate(subDays(MainDate,1))}

                >
                  <span className="sr-only">Previous month</span>
                  <ChevronLeft
                    className="h-4 w-4 "
                    aria-hidden="true"

                  />
                </button>
                <button
                  type="button"
                  className="m-2 p-2 flex items-center rounded-md shadow-sm md:items-stretch border-t border-b border-gray-300 bg-white px-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:relative md:block"
                  onClick={ ()=>setMainDate(new Date())}
                >
                  Today
                </button>
  
                <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
                <button
                  type="button"
                  className="m-2 p-2 rounded-md shadow-sm border-t border-b border-gray-300 bg-white  text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 hidden md:block"
                  onClick={ ()=>setMainDate(addDays(MainDate,1)) }
                  >
                  <span className="sr-only">Next month</span>
                  <ChevronRight
                    className="h-5 w-5"
                    aria-hidden="true"

                  />
                </button>
              </div>
            )}
                        {DayorWeek == "Week" && (
              <div className="flex items-center rounded-md shadow-sm items-stretch ">

                <button
                  type="button"
                  className="m-2 p-2 flex items-center rounded-md shadow-sm md:items-stretch border-t border-b border-gray-300 bg-white px-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:relative md:block"
                  onClick={()=>changeDateLabel('This')}       
                  >
                  This Week
                </button>
  
                <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
                <button
                  type="button"
                  className="m-2 p-2 flex items-center rounded-md shadow-sm md:items-stretch border-t border-b border-gray-300 bg-white px-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:relative md:block"
                  onClick={()=>changeDateLabel('Next')}

                >
                  Next Week
                </button>
              </div>
            )}
  
            <div
              className="m-2 p-2 flex items-center rounded-md shadow-sm md:items-stretch border-t border-b border-gray-300 bg-white px-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:relative md:block"
                onClick={()=>setDayorWeek('Week')}
            >
              Week
            </div>
  
            <div
              className=" p-2 flex items-center rounded-md shadow-sm md:items-stretch border-t border-b border-gray-300 bg-white px-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:relative md:block"
              onClick={()=>setDayorWeek('Day')}
              

           >
              Day
            </div>
  
            <div
              className="m-2 p-2 flex items-center rounded-md shadow-sm md:items-stretch border-t border-b border-gray-300 bg-white lg:px-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:relative md:block"
              onClick={()=>setExpandAll((ExpandAll:any) => !ExpandAll)}

            >
              Expand All
            </div>
          </div>
        </header>
      </>

      );
    }