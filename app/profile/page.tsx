'use client'
import { formatPicture } from '@/utils';
import { useActiveProfile, useProfilesToFollow } from '@lens-protocol/react-web';
import { FaTwitter } from 'react-icons/fa';
import { FiGlobe } from 'react-icons/fi';
import { MdApps } from 'react-icons/md';
import Navbar from '../components/NavBar';
import Image from 'next/image';
import ProfileScore from '../components/ProfileScore';
import { AiOutlineSync } from 'react-icons/ai';
import { useState } from 'react';
import ProfileFeed from '../components/ProfileFeed';

const ProfilePage = () => {
    const { data, error, loading } = useActiveProfile();
    const [refresh, setRefresh] = useState(0);

    if (loading) return <p>Loading...</p>

    if (error) return <p>{error.message}</p>

    if (data === null) return <p>No active profile selected</p>

    const { name, handle, bio, picture, stats, attributes, interests } = data;

    return (
        <>
            <Navbar />
            <div className="bg-black min-h-screen flex flex-col items-center justify-center py-5 px-4">
                <div className=" shadow overflow-hidden sm:rounded-lg max-w-5xl w-full">
                    <div className="px-4 py-5 sm:px-6 bg-magenta text-white flex flex-col items-center">
                        {picture && <Image width="200"
                            height="200" className="h-24 w-24 rounded-full" src={formatPicture(picture)} alt={name as string} />}
                        <h2 className="mt-2 text-lg leading-6 font-medium">{name}</h2>
                        <p className="mt-1 text-sm">@{handle}</p>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                        <p className="mt-1 max-w-2xl text-sm text-gray-400">{bio}</p>
                        <div className="mt-5 flex items-center space-x-3 text-sm">
                            {attributes.website &&
                                <p className="text-turquoise flex items-center space-x-1">
                                    <FiGlobe />
                                    <a href={attributes.website.toString()} target="_blank" rel="noreferrer">{attributes.website.toString()}</a>
                                </p>}
                            {attributes.twitter &&
                                <p className="text-turquoise flex items-center space-x-1">
                                    <FaTwitter />
                                    <a href={`https://twitter.com/${attributes.twitter}`} target="_blank" rel="noreferrer">@{attributes.twitter.toString()}</a>
                                </p>}
                            {/* {attributes.app &&
                                <p className="text-turquoise flex items-center space-x-1">
                                    <MdApps />
                                    <span>{attributes.app.attribute.value}</span>
                                </p>} */}
                        </div>
                        <div className="mt-5 grid grid-cols-4 gap-4 text-center text-sm text-gray-400">
                            <div>
                                <p className="text-brightYellow text-lg font-semibold">{stats.totalFollowers}</p>
                                <p>Followers</p>
                            </div>
                            <div>
                                <p className="text-brightYellow text-lg font-semibold">{stats.totalFollowing}</p>
                                <p>Following</p>
                            </div>
                            <div>
                                <p className="text-brightYellow text-lg font-semibold">{stats.totalPosts}</p>
                                <p>Teasrs</p>
                            </div>
                            <div>
                                <ProfileScore profileId="0x01bce6" refresh={refresh} />
                                <div className='flex items-center justify-center space-x-2'>
                                <p>Reputation</p>
                                    <div className='hover:cursor-pointer' onClick={() => setRefresh(refresh + 1)}>
                                    <AiOutlineSync />
                                </div>
                                </div>

                            </div>
                        </div>
                        <div>                        </div>
                        <div className="mt-5">
                            <p className="font-medium text-gray-400">Topics:</p>
                            <div className="mt-2 flex flex-wrap">
                                {data.interests?.map((interest, index) => (
                                    <span key={index} className="m-1 text-xs text-gray-500 bg-gray-800 py-1 px-2 rounded-full border border-gray-700">
                                        {interest.replace('__', ' / ')}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="mt-5">
                            <p className="font-medium text-gray-400">On-Chain Identity:</p>
                            <p className="mt-2 text-sm text-gray-500">{data?.onChainIdentity?.ens?.name as string}</p>
                            <p className="mt-2 text-sm text-gray-500">Proof of Humanity: {data.onChainIdentity.proofOfHumanity ? 'Yes' : 'No'}</p>
                            <p className="mt-2 text-sm text-gray-500">Is Human: {data.onChainIdentity.worldcoin.isHuman ? 'Yes' : 'No'}</p>
                        </div>
                    </div>
                </div>
                <ProfileFeed />
            </div>
        </>
    )
}

export default ProfilePage;
