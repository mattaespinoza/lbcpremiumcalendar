import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
//import BillingButton from "../../components/purchase/billing";
import Link from "next/link";

interface Props {
city:any
user:any

}
export default function Dashboard(props:any) {
    const router = useRouter();

    var user=props.user
    var city=props.city




    async function runLogout(){
      await fetch('/api/auth/logout').then(resp=>{
    alert('you have been logged out')
       window.location.reload()
      })
    }


  return(
<>

<div className="bg-gray-100 shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 text-center bg-calendarblue">
        <h3 className="text-2xl leading-6 font-bold text-white">
          Your {user.city} Premium Account Dashboard
        </h3>
        <p className="mt-1 text-lg text-white">Your Account Information.</p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 text-center">
          <div className="sm:col-span-1">
            <dt className="text-lg font-bold text-calendarblue">
              You are signed in as:
            </dt>
            <dd className="mt-1 text-base text-gray-900">
              {user.email}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-lg font-bold text-calendarblue">
              Your Plan status is:
            </dt>
            <dd className="mt-1 text-base text-gray-900">
              {user["active_subscription"]} Subscription
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-lg font-bold text-calendarblue">
              You are subscribed to:
            </dt>
            <dd className="mt-1 text-base text-gray-900">
              {" "}
              {user.city} Premium Business Calendar
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-lg font-bold text-calendarblue">
              Account Info and Plan:
            </dt>
            <dd className="mt-1 text-base text-black font-bold underline">
            {/*}  <BillingButton customerid={user['stripe_customer_id']} city={city} /> */} Hold for Billing Button
            </dd>
          </div>
          <div className="sm:col-span-1">
            <button
              className="bg-calendarblue  p-2 w-24 text-white rounded-md"
              onClick={() => router.push(`/${city.slug}/premium/calendar`)}
            >
              Events
            </button>
          </div>
          <div className="sm:col-span-1">
            <button
              className="bg-calendarblue p-2 w-24 text-white rounded-md"
              onClick={()=>{runLogout()}}
              >
              Signout
            </button>
          </div>

          <div className="sm:col-span-2 text-black font-medium mt-20 text-lg">
            If you have any questions or issues with your account please contact
            us at matthew@localbusinesscalendars.com
          </div>
        </dl>
        <div className="text-center mt-4 block font-semibold text-calendarblue text-lg">
             Need to Change your email? Please email matthew@localbusinesscalendars.com to change your email


        </div>
      </div>
    </div>
  

</>
);}

//add the login process just use the api instead of this magic link thing right? 