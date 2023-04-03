import React, { useEffect,useState } from 'react';
import { useRouter } from 'next/router';
import {  NextPage } from 'next';
import Head from "next/head";
import Calendar from "../../../../components/premium/calendar";
import Link from 'next/link';
import { compareAsc, format, endOfDay, getDaysInMonth } from "date-fns";
import { useUser } from '@supabase/auth-helpers-react'
import { supabase } from '../../../../../utils/supbaseClient'

import Image from 'next/image'





interface Props {
  company:any;
    events:any;
    city:any;
}




const PremiumCalendar: NextPage<Props> = (props) => {
    var company=props.company
    var events = props.events
    var city = props.city



  return (
    <>

          <div className="bg-gray-200">
            <div className="xl:w-10/12 m-auto border-2">

              <Image className='m-auto mt-4' alt="logo of amana heating and air conditioning" width={400} height={400} src={company['top_ad']}/>
              <Calendar events={events} city={city} />
              <Image className='m-auto mt-4 mb-12' alt="logo of amana heating and air conditioning" width={400} height={400} src={company['bottom_ad']}/>
  
            </div>
          </div>

    </>
  );
};


export async function getStaticProps(context:any ) {
  const companies = await supabase.from('companies').select('*').eq('slug',context.params.company)

    const events = await supabase.from('events').select('*').eq('city_calendar',companies.data![0].city)
    const city = await supabase.from('cities').select('name,business_calendar,website,email,slug').eq('name',companies.data![0].city)

    console.log(events)
      return {
    props: { city: JSON.parse(JSON.stringify(city.data![0])),company: JSON.parse(JSON.stringify(companies.data![0])),events: JSON.parse(JSON.stringify(events.data))},
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
  };

}



export async function getStaticPaths(context:any ) {
  const companies = await supabase.from('companies').select('*').eq('active',true)

  const paths = companies.data!.map((companies1:any) => ({
    params: { company: companies1.slug }, // keep in mind if post.id is a number you need to stringify post.id
  }));

  return {
    paths,
    fallback: "blocking",
  };
    }
    

    export default PremiumCalendar;
