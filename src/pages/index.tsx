import Head from 'next/head'
import Image from 'next/image'

import { useUser } from '@supabase/auth-helpers-react'

export default function Home() {
  const user = useUser()

  return (
    <>
     <div className='text-2xl'>test</div>

    </>


      
  )
}
