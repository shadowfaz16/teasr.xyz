'use client'
import { ProfileId, useExplorePublications } from '@lens-protocol/react-web';
import { formatPicture } from '../../utils';
import Image from 'next/image';
import Link from 'next/link';

const LoggedOutFeed = () => {
    const {
        data, loading, hasMore, next
    } = useExplorePublications({
        limit: 5,
        metadataFilter: {
            restrictPublicationTagsTo: {
                oneOf: ['lens'],
            },
        },
    });

    console.log("feedItems", data)

    return (
        <div className="space-y-4 mt-10">
            {data?.map((post) => (
                <div
                    key={post.id}
                    className="bg-black/75 border border-white rounded-xl shadow-md overflow-hidden p-2"
                >
                    <Link href={`/profile/${post.profile.handle}`} className="p-4 flex items-center w-auto">
                        <Image
                            width="200"
                            height="200"
                            className="w-12 h-12 rounded-full mr-4 ring-2 ring-teal-200"
                            src={formatPicture(post.profile.picture)}
                            alt={post.profile.name as string}
                        />
                        <div>
                            <div className="text-sm font-semibold ">
                                {post.profile.name}
                            </div>
                            <div className="text-xs text-gray-500">
                                @{post.profile.handle}
                            </div>
                        </div>
                    </Link>
                    <div className="px-4 pb-4">
                        <div className="text-sm whitespace-pre-wrap"><pre>{post.metadata?.content}</pre></div>
                        {post.metadata?.media.map((media, index) => (
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

export default LoggedOutFeed;