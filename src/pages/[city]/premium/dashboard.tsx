
 

import React, { useEffect,useState } from 'react';
import { useRouter } from 'next/router';
import Dashboard from '../../../components/premium/dashboard';
import CityNavBar from '../../../components/menu/citynavbar';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { supabase } from '../../../../utils/supbaseClient'



interface Props {
   city: any;
  
  }

  
const DashboardPage= (props:any) => {
    const session = useSession()


  return (
    <>
    {!session && (
            <>
                <CityNavBar city={'San Antonio'} color={"white"} color2={"calendarblue"} User={'no'}/>

              <div className='text-center text-2xl'> You need to login to view this content.</div>

            </>

    )}    
    {session  && (
            <>
    
            <CityNavBar city={'San Antonio'} color={"white"} color2={"calendarblue"} User={'yes'}/>
            {/*<Dashboard user={UserData} city={city}/>*/}

            </>

     )}  
    </>  

);
};




export async function getStaticProps(context:any ) {

  const city = await supabase.from('cities').select('name,business_calendar,website,email,slug').eq('slug',context.params.city)





  return {
    props: { city: JSON.parse(JSON.stringify(city.data![0])) },

    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
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




    export default DashboardPage;