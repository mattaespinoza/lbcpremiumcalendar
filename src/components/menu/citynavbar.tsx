import { useState, useEffect } from "react";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Menu,X } from "heroicons-react";
import Link from "next/link";
 import { ChevronDown } from "heroicons-react";
import { NextPage } from "next";
import { supabase } from '../../../utils/supbaseClient'

interface Props {
    city: any;
    color:any;
    color2:any;
    User:any
  }
const CityNavBar: NextPage<Props> = ({city,color,color2,User}) => {
  async function runLogout(){
     await fetch('/api/auth/logout').then(resp=>{
   alert('you have been logged out')
      window.location.reload()
     }
   )

  }
    const premiumnavigation = [
        { name: "Week's Events", href: `/${city.slug}/premium/calendar` },
        { name: "Dashboard", href: `/${city.slug}/premium/dashboard` },
      ];
    
      const navigation = [
        { name: "Home", href: `/${city.slug}` },
        { name: "Submit Event", href: `/${city.slug}/addevent` },
        { name: "Weekly Subscription", href: `/${city.slug}/subscribe` },
      ];




  return (
    <div className={`relative pt-6 pb-8 sm:pb-12 bg-${color}`}>
    <Popover>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <nav
          className="relative flex items-center justify-between sm:h-10 md:justify-center"
          aria-label="Global"
        >
          <div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
            <div className="flex items-center justify-between w-full md:w-auto">
              <Link href={`/${city.slug}`}>
                  <div className="grid grid-cols-4">
                    <div
                      className={`col-span-3 sm:col-span-2  text-${color2} font-bold mr-2  text-lg lg:text-2xl`}
                    >
                      {city.name}
                    </div>
                    <div className={`text-${color2} w-4 leading-4`}>
                      Business Calendar{" "}
                    </div>
                  </div>
              </Link>
              <div className="-mr-2 flex items-center md:hidden">
                <Popover.Button className="bg-gray-50 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-calendarblue">
                  <span className="sr-only">Open main menu</span>
                  <Menu className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
          </div>
          {User == 'no' && (
            <>
              <div className="hidden md:flex space-x-4 lg:space-x-6 xl:space-x-10">
                {navigation.map((item) => (
                  <Link key={item.name} href={item.href}  className={`font-medium ml-16 lg:ml-0 text-base lg:text-xl text-${color2}`}>
                      {item.name}
                  </Link>
                ))}
              </div>
            </>
          )}
              {User =='yes' && (
            <>
              <div className="hidden md:flex space-x-4 lg:space-x-6 xl:space-x-10">
                {premiumnavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`font-medium ml-16 lg:ml-0 text-base lg:text-xl text-${color2}`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </>
          )}

          <div className="hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0">
            <span className="inline-flex rounded-md shadow">
            {User == 'no' && (
                <Link href={`/${city.slug}/premium/login`}>
                    <div
                      className={`inline-flex items-center px-4 py-2 border cursor-pointer border-transparent text-xl font-medium rounded-md text-${color} bg-${color2} hover:bg-${color2}`}
                    >
                      Log In
                    </div>
                </Link>
              )}

              {User == 'yes' && (
                <>
                  <span
                    className={`inline-flex items-center px-4 py-2 border cursor-pointer border-transparent text-xl font-medium rounded-md text-${color} bg-${color2} hover:bg-${color2}`}
                    onClick={()=>runLogout()}
                 >
                    Signout
                  </span>
                </>
              )}
            </span>
          </div>
        </nav>
      </div>

      <Transition
        as={Fragment}
        enter="duration-150 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
        >
          <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div className="px-5 pt-4 flex items-center justify-between">
              <div>
                <div className="grid grid-cols-4">
                  <div className="col-span-2 sm:col-span-1 text-calendarblue font-bold mr-2 md:text-2xl">
                      {city.name}
                  </div>
                  <div className=" text-calendarblue w-4 leading-4">
                    Business Calendar{" "}
                  </div>
                </div>
              </div>
              <div className="-mr-2">
                <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-calendarblue">
                  <span className="sr-only">Close menu</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>

            {User == 'no' && (
              <div className="px-2 pt-2 pb-3">
                {navigation.map((item) => (
                  <Link className="block px-3 py-2 rounded-md text-base font-medium text-calendarblue hover:text-gray-900 hover:bg-gray-50" key={item.name} href={item.href}>
                      {item.name}
                  </Link>
                ))}
              </div>
            )}
          {User == 'yes' && (
              <div className="px-2 pt-2 pb-3">
                {premiumnavigation.map((item) => (
                  <Link className="block px-3 py-2 rounded-md text-base cursor-pointer font-medium text-calendarblue hover:text-gray-900 hover:bg-gray-50" key={item.name} href={item.href}>
                      {item.name}
                  </Link>
                ))}
              </div>
            )}

          {User == 'no' && (
              <Link className="block w-full px-5 py-3 text-center cursor-pointer font-medium text-calendarblue bg-gray-50 hover:bg-gray-100" key="Log in" href={`/${city.slug}/premium/login`}>
                  Log In
              </Link>
            )}

          {User == 'yes' && (
              <>
                <span
                  className="block w-full px-5 py-3 text-center font-medium text-calendarblue bg-gray-50 hover:bg-gray-100"
                  onClick={()=>{runLogout()}}
                >
                  Signout
                </span>
              </>
            )}
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  </div>
  );
};



export default CityNavBar;