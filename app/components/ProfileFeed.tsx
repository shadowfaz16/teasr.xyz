'use client'
import { ProfileId, useActiveProfile, usePublications } from '@lens-protocol/react-web';
import { formatPicture } from '../../utils';
import Image from 'next/image';
import Link from 'next/link';
import { Player } from '@livepeer/react';


const ProfileFeed = () => {
    const { data: user, loading: userLoading } = useActiveProfile();
    console.log("user", user)
    let {
        data: publications,
        loading,
        hasMore,
        next,
    } = usePublications({
        profileId: '0x01bce6' as ProfileId,
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
        <div className="gap-4 mt-10 grid grid-cols-2">
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
                                        src={formatPicture(user?.picture)}
                                        alt={user?.handle as string}
                                    />
                                    <div className='mb-4'>
                                        <p className="text-white text-sm">{user?.name}</p>
                                        <p className="text-white text-sm">@{user?.handle}</p>
                                    </div>
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold">
                                            {pub.metadata.content}
                                        </div>
                                    </div>
                            </div>
                        }
                        {
                            pub.metadata.mainContentFocus === "VIDEO" && <Player title={pub.metadata.content} playbackId={pub.metadata.description.replace('videoid_', '')} />
                        }
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