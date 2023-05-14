'use client'
import { ProfileId, useFeed } from '@lens-protocol/react-web';
import { formatPicture } from '../../utils';
import Image from 'next/image';
import Link from 'next/link';

const Feed = () => {
    const {
        data: feedItems,
        loading,
        hasMore,
        next,
    } = useFeed({
        profileId: '0x80b0' as ProfileId,
        limit: 5,
        // metadataFilter: {
        //     restrictPublicationTagsTo: {
        //         oneOf: ['teas'],
        //     },
        // },
    });

    console.log("feedItems", feedItems)

    return (
        <div className="space-y-4 mt-10">
            {feedItems?.map((post) => (
                <div
                    key={post.root.id}
                    className="bg-black/75 border border-white rounded-xl shadow-md overflow-hidden p-2"
                >
                    <Link href={`/profile/${post.root.profile.handle}`} className="p-4 flex items-center w-auto">
                        <Image
                            width="200"
                            height="200"
                            className="w-12 h-12 rounded-full mr-4 ring-2 ring-teal-200"
                            src={formatPicture(post.root.profile.picture)}
                            alt={post.root.profile.name as string}
                        />
                        <div>
                            <div className="text-sm font-semibold ">
                                {post.root.profile.name}
                            </div>
                            <div className="text-xs text-gray-500">
                                @{post.root.profile.handle}
                            </div>
                        </div>
                    </Link>
                    <div className="px-4 pb-4">
                        <div className="text-sm whitespace-pre-wrap">{post.root.metadata.content}</div>
                        {post.root.metadata.media.map((media, index) => (
                            <div key={index} className="mt-2">
                                <video
                                    className="w-full"
                                    controls
                                    src={media.original.url}
                                ></video>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Feed;