import React, { useEffect, useState } from "react";

import Image from "next/image";

interface Props {
city:any

}
export default function Onboarding(props:any) {

    var city=props.city

  return(
    <>
      <div className="bg-calendarblue">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Thank You for signing up for </span>
            <span className="block"> {city.name} Premium Subscription!</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-indigo-200">
            You are now able to click the Log In button in the top right hand corner and see the week&apos;s events!
            See Below for what&apos;s included in your premium subscription.
          </p>
        </div>
      </div>
      <div className="relative bg-white pt-16 pb-32 overflow-hidden">
        <div className="relative">
          <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
            <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
              <div>
                <div className="mt-6">
                  <h2 className="text-3xl font-extrabold tracking-tight text-calendarblue">
                    Your First Resource: The Weekly Email
                  </h2>
                  <p className="mt-4 text-lg text-gray-500">
                    You will start recieving your first weekly email of events
                    starting next Monday. This email will have the entire weeks
                    of {city.name}&apos; events so you can plan out your week
                    and know in advance what networking opportunities are
                    avaliable to you.
                  </p>
                  <p className="mt-4 text-lg text-gray-500">
                    If you dont see the email on Monday, check your spam folder
                    and any other tabs, the email may have gone to and move it
                    to your Primary inbox. If you have any questions or
                    problems, please contact us at
                    support@localbusinesscalendars.com
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-12 sm:mt-16 lg:mt-0">
              <div className="pl-4 -mr-48 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full text-center">
                <Image
                  className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                  src="https://dl.airtable.com/.attachments/c4ad569c4623a2cd0bc8871165e3314e/a8755171/ScreenShot2022-05-02at10_51_30PM.png"
                  alt="Inbox user interface"
                  width={300}
                  height={600}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-24">
          <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
            <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-32 lg:max-w-none lg:mx-0 lg:px-0 lg:col-start-2">
              <div>
                <div className="mt-6">
                  <h2 className="text-3xl font-extrabold tracking-tight text-calendarblue">
                    Your Second Resource: Weekly Event Calendar
                  </h2>
                  <p className="mt-4 text-lg text-gray-500">
                    The Weekly Event Calendar will give you access to the week’s
                    events at any time, no need to look back in your email for
                    the list of events. Make sure you’ve checked your inbox for
                    the login information. Any questions or issues, please contact us.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-12 sm:mt-16 lg:mt-0 lg:col-start-1">
              <div className="pr-4 -ml-48 sm:pr-6 md:-ml-16 lg:px-0 lg:m-0 lg:relative lg:h-full text-center">
                <Image
                  className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none"
                  src="https://dl.airtable.com/.attachments/9be9a58aad91a642f8cac73df2fe7bdc/9bc1aa57/ScreenShot2022-05-02at10_43_07PM.png"
                  alt="Customer profile user interface"
                  width={600}
                  height={800}
                />
              </div>
            </div>
          </div>
          <div className="bg-white">
            <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 lg:flex lg:items-center lg:justify-center">
              <h2 className="text-4xl font-extrabold  text-calendarblue sm:text-4xl">
                <span className="block">
                  Keep on the Lookout for Special Emails about Events
                </span>
                <span className="block font-normal text-lg text-gray-500 mt-4">
                  On occasion, we will send you special event invitaitons and
                  promotions for city business events. Contact us with any
                  questions you may have about your account or any issues you
                  may have. contact us at support@localbusinesscalendars.com
                </span>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
);}

//add the login process just use the api instead of this magic link thing right? 