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


export default function Home() {
  const {
    data: feedItems,
    loading,
    hasMore,
    next,
  } = useFeed({
    profileId: '0x01bce6' as ProfileId,
    limit: 10,
  });

  console.log("feedItems", feedItems)

  return (
    <>
      <Navbar />
      <div className='grid grid-cols-1 md:grid-cols-3 md:p-10 md:gap-10'>
        {/* feed */}
        <div className='col-span-2 px-4 md:px-0'>
        <Feed />
        </div>
        <div className='col-span-1'>
          <SuggestedFollows />
        </div>
      </div>
      <div className='flex md:hidden'>
        <BottomNav />
      </div>
    </>
  );
}