import React, { useEffect,useState } from 'react';
import { useRouter } from 'next/router';
import {  NextPage } from 'next';
import Head from "next/head";
import Link from 'next/link';
import { compareAsc, format, endOfDay, getDaysInMonth } from "date-fns";
import { useUser } from '@supabase/auth-helpers-react'
import { supabase } from '../../../utils/supbaseClient'

import "react-notion/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";

import { NotionRenderer } from "react-notion";




import Image from 'next/image'
interface Props {
    city:any;
    events:any;
    blockMap:any
}


const Home: NextPage<Props> = (props) => {
    var city=props.city
    var events = props.events
    var blockMap=props.blockMap
    

    
  return (
    <>
        <div className='m-auto' style={{ maxWidth: 768 }}>
            <NotionRenderer blockMap={blockMap} />
        </div>



    </>
  )
}
export async function getStaticProps(context:any ) {
    const city = await supabase.from('cities').select('name,business_calendar,website,email,slug').eq('slug',context.params.city)
      //must change this to no dupes
      const events = await supabase.from('events').select('*').eq('city_calendar',city.data![0].name)
      const data = await fetch(
        "https://notion-api.splitbee.io/v1/page/add3ed43ec73467abe4af01e6cbb029f"
      ).then(res => res.json());

      return {
      props: { city: JSON.parse(JSON.stringify(city.data![0])),blockMap: data, events: JSON.parse(JSON.stringify(events.data))},
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
      
  
      export default Home;
  