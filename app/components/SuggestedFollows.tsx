// app/page.tsx
'use client'
import Image from 'next/image'
import { useExploreProfiles } from '@lens-protocol/react-web'
import Link from 'next/link'
import { formatPicture } from '../../utils'


export default function SuggestedFollows() {
    const { data } = useExploreProfiles({
        limit: 5
    })

    return (
        <>
                <div className='flex justify-between mb-4'>
                    <h5 className='font-bold'>✨ Top reputations</h5>
                </div>
                <div className='p-5 border border-teal rounded-xl flex flex-col space-y-4'>
                    {
                        data?.slice(0, 5).map((profile, index) => (
                            <Link href={`/profile/${profile.handle}`} key={index} className=''>
                                <div className='space-y-2 mt-2'>
                                    {
                                        profile.picture && profile.picture.__typename === 'MediaSet' ? (
                                            <Image
                                                src={formatPicture(profile.picture)}
                                                width="50"
                                                height="50"
                                                alt={profile.handle}
                                                className='rounded-full'
                                            />
                                        ) : <div className="w-14 h-14 bg-slate-500	" />
                                    }
                                    <h3 className="text-sm my-4 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-magenta-500 via-magenta-500">@{profile.handle}</h3>
                                </div>
                            </Link>
                        ))
                    }
                </div>
        </>
    )
}
