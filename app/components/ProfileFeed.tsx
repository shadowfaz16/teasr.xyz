'use client'
import { ProfileId, useActiveProfile, useProfile, usePublications } from '@lens-protocol/react-web';
import { formatPicture } from '../../utils';
import Image from 'next/image';
import Link from 'next/link';
import { Player } from '@livepeer/react';
import { usePathname } from 'next/navigation';
 

const ProfileFeed = () => {

    const pathName = usePathname()
    const handle = pathName?.split('/')[2]

    const { data: profile } = useProfile({ handle })

    let {
        data: publications,
        loading,
        hasMore,
        next,
    } = usePublications({
        profileId: profile?.id as ProfileId,
        limit: 16,
        // metadataFilter: {
        //     restrictPublicationTagsTo: {
        //         oneOf: ['teas'],
        //     },
        // },
    });

    console.log("feedItems", publications)

    publications = publications?.map(publication => {
        if (publication.__typename === 'Mirror') {
            return publication.mirrorOf
        } else {
            return publication
        }
    })

    return (
        <div className="gap-4 mt-10 grid md:grid-cols-2">
            {
                publications?.map((pub: any, index: number) => (
                    <div key={index} className="bg-black border border-white rounded-xl px-6 py-4 mb-4 shadow-md">
                        {
                            pub.metadata && 
                            <div className='space-y-4'>
                                <div className="flex items-center w-auto">
                                    <Image
                                        width="200"
                                        height="200"
                                        className="w-12 h-12 rounded-full mr-4 ring-2 ring-teal-200"
                                        src={formatPicture(profile?.picture)}
                                        alt={profile?.handle as string}
                                    />
                                    <div className='mb-4'>
                                        <p className="text-white text-sm">{profile?.name}</p>
                                        <p className="text-white text-sm">@{profile?.handle}</p>
                                    </div>
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold">
                                            {pub.metadata.content}
                                        </div>
                                    </div>
                            </div>
                        }
                        {/* {
                            pub.metadata.mainContentFocus === "VIDEO" && <Player title={pub.metadata.content} playbackId={pub.metadata.description.replace('videoid_', '')} />
                        } */}
                        {
                            pub.metadata?.media[0]?.original && ['image/jpeg', 'image/png'].includes(pub.metadata?.media[0]?.original.mimeType) && (
                                <Image
                                    width="400"
                                    height="400"
                                    alt={pub.profile.handle}
                                    className='rounded-xl mt-4'
                                    src={formatPicture(pub.metadata.media[0])}
                                />
                            )
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default ProfileFeed;