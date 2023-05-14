// app/page.tsx
'use client'
import Image from 'next/image'
import { ProfileId, useFeed } from '@lens-protocol/react-web'
import  {formatPicture} from '../utils'
import Navbar from './components/NavBar'
import BottomNav from './components/BottomNav'
import SuggestedFollows from './components/SuggestedFollows'
import { useEffect } from 'react'
import Feed from './components/MainFeed'
import LoggedOutFeed from './components/LoggedOutFeed'


export default function Home() {
 
  return (
    <>
      <Navbar />
      <div className='grid grid-cols-1 md:grid-cols-3 md:p-10 md:gap-10'>
        {/* feed */}
        <div className='col-span-2 px-4 md:px-0'>
        {/* <LoggedOutFeed /> */}
        <Feed />
        </div>
        <div className='col-span-1'>
          <SuggestedFollows />
        </div>
      </div>
    </>
  );
}