'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { ethers } from 'ethers'
import Image from 'next/image'
import { useProfile, usePublications } from '@lens-protocol/react-web'
import { formatPicture } from '../../../utils'
import ABI from '../../../abi.json'
import Navbar from '@/app/components/NavBar'
import { Player, useAssetMetrics, useCreateAsset, useUpdateAsset } from '@livepeer/react';
import ProfileScore from '@/app/components/ProfileScore'
import { AiOutlineSync } from 'react-icons/ai'
import { FiGlobe } from 'react-icons/fi'
import { FaTwitter } from 'react-icons/fa'
import ProfileFeed from '@/app/components/ProfileFeed'

const CONTRACT_ADDRESS = '0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d'

export default function Profile() {
    const [refresh, setRefresh] = useState(0);
    const [connected, setConnected] = useState<boolean>(false)
    const [account, setAccount] = useState('')

    const pathName = usePathname()
    const handle = pathName?.split('/')[2]

    const { data: profile } = useProfile({ handle })

    useEffect(() => {
        checkConnection()
    }, [handle])

    console.log("profile: ", profile)

    async function checkConnection() {
        if (!window.ethereum) return
        const provider = new ethers.providers.Web3Provider(window.ethereum as any)
        const addresses = await provider.listAccounts();
        if (addresses.length) {
            setConnected(true)
        } else {
            setConnected(false)
        }
    }

    async function connectWallet() {
        if (!window.ethereum) return
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts"
        })
        console.log('accounts: ', accounts)
        accounts[0]
        setAccount(account)
        setConnected(true)
    }

    function getSigner() {
        const provider = new ethers.providers.Web3Provider(window.ethereum as any)
        return provider.getSigner();
    }

    async function followUser() {
        if (!profile) return
        const contract = new ethers.Contract(
            CONTRACT_ADDRESS,
            ABI,
            getSigner()
        )

        try {
            const tx = await contract.follow([profile.id], [0x0])
            await tx.wait()
            console.log(`successfully followed ... ${profile.handle}`)
        } catch (err) {
            console.log('error: ', err)
        }
    }

    
    if (!profile) return null

    return (
        <>
            <Navbar />
            <div className="bg-black min-h-screen flex flex-col items-center justify-center py-5 px-4">
                <div className=" shadow overflow-hidden sm:rounded-lg max-w-5xl w-full">
                    <div className="px-4 py-5 sm:px-6 bg-magenta text-white flex flex-col items-center">
                        {profile.picture && <Image width="200"
                            height="200" className="h-24 w-24 rounded-full" src={formatPicture(profile.picture)} alt={profile.name as string} />}
                        <h2 className="mt-2 text-lg leading-6 font-medium">{profile.name}</h2>
                        <p className="mt-1 text-sm">@{handle}</p>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                        <p className="mt-1 max-w-2xl text-sm text-gray-400">{profile.bio}</p>
                        <div className="mt-5 flex items-center space-x-3 text-sm">
                            {profile.attributes.website &&
                                <p className="text-turquoise flex items-center space-x-1">
                                    <FiGlobe />
                                    <a href={profile.attributes.website.toString()} target="_blank" rel="noreferrer">{profile.attributes.website.toString()}</a>
                                </p>}
                            {profile.attributes.twitter &&
                                <p className="text-turquoise flex items-center space-x-1">
                                    <FaTwitter />
                                    <a href={`https://twitter.com/${profile.attributes.twitter}`} target="_blank" rel="noreferrer">@{profile.attributes.twitter.toString()}</a>
                                </p>}
                            {/* {attributes.app &&
                                <p className="text-turquoise flex items-center space-x-1">
                                    <MdApps />
                                    <span>{attributes.app.attribute.value}</span>
                                </p>} */}
                        </div>
                        <div className="mt-5 grid grid-cols-4 gap-4 text-center text-sm text-gray-400">
                            <div>
                                <p className="text-brightYellow text-lg font-semibold">{profile.stats.totalFollowers}</p>
                                <p>Followers</p>
                            </div>
                            <div>
                                <p className="text-brightYellow text-lg font-semibold">{profile.stats.totalFollowing}</p>
                                <p>Following</p>
                            </div>
                            <div>
                                <p className="text-brightYellow text-lg font-semibold">{profile.stats.totalPosts}</p>
                                <p>Teasrs</p>
                            </div>
                            <div>
                                <ProfileScore profileId={profile.id} refresh={refresh} />
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
                                {profile.interests?.map((interest, index) => (
                                    <span key={index} className="m-1 text-xs text-gray-500 bg-gray-800 py-1 px-2 rounded-full border border-gray-700">
                                        {interest.replace('__', ' / ')}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="mt-5">
                            <p className="font-medium text-gray-400">On-Chain Identity:</p>
                            <p className="mt-2 text-sm text-gray-500">{profile.onChainIdentity?.ens?.name as string}</p>
                            <p className="mt-2 text-sm text-gray-500">Proof of Humanity: {profile.onChainIdentity.proofOfHumanity ? 'Yes' : 'No'}</p>
                            <p className="mt-2 text-sm text-gray-500">Is Human: {profile.onChainIdentity.worldcoin.isHuman ? 'Yes' : 'No'}</p>
                        </div>
                    </div>
                </div>
                <ProfileFeed />
            </div>
        </>
    )
}