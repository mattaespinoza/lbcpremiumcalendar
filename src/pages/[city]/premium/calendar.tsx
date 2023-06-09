import React, { useEffect,useState } from 'react';
import { useRouter } from 'next/router';
import {  NextPage } from 'next';
import Head from "next/head";
import Calendar from "../../../components/premium/calendar";
import Link from 'next/link';
import { compareAsc, format, endOfDay, getDaysInMonth } from "date-fns";
import { useUser } from '@supabase/auth-helpers-react'
import { supabase } from '../../../../utils/supbaseClient'
import Filters from '@/components/premium/calendar/filters';
import Image from 'next/image'





interface Props {
    city:any;
    events:any
}




const PremiumCalendar: NextPage<Props> = (props) => {
    var city=props.city
    var events = props.events
    
//test

  return (
    <>
    
          <div className="bg-gray-200">
            <div className="xl:w-10/12 m-auto border-2">
              <Calendar events={events} city={city} />
             <div className='text-xl'> *Disclaimer: The Events on this Calendar are Updated with the Following Weeks Events Every Sunday Evening</div>
            </div>
          </div>

    </>
  );
};


export async function getStaticProps(context:any ) {
  const city = await supabase.from('cities').select('name,business_calendar,website,email,slug').eq('slug',context.params.city)
    //must change this to no dupes
    const events = await supabase.from('events').select('*').eq('city_calendar',city.data![0].name)
  return {
    props: { city: JSON.parse(JSON.stringify(city.data![0])),events: JSON.parse(JSON.stringify(events.data))},
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
  };

}



export async function getStaticPaths(context:any ) {
  const cities = await supabase.from('cities').select('*').eq('active',true)

  const paths = cities.data!.map((city1:any) => ({
    params: { city: city1.slug }, // keep in mind if post.id is a number you need to stringify post.id
  }));

  return {
    paths,
    fallback: "blocking",
  };
    }
    

    export default PremiumCalendar;
