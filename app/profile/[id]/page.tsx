'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { ethers } from 'ethers'
import Image from 'next/image'
import { useProfile, usePublications } from '@lens-protocol/react-web'
import { formatPicture } from '../../../utils'
import ABI from '../../../abi.json'
import Navbar from '@/app/components/NavBar'

const CONTRACT_ADDRESS = '0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d'

export default function Profile() {
    const [connected, setConnected] = useState<boolean>(false)
    const [account, setAccount] = useState('')

    const pathName = usePathname()
    const handle = pathName?.split('/')[2]

    const { data: profile } = useProfile({ handle })

    useEffect(() => {
        checkConnection()
    }, [handle])

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
                <div className="max-w-3xl mx-auto">
                    <div className="flex flex-col items-center bg-white p-6 mx-2 rounded-xl shadow-md">
                        {
                            !connected && (
                                <button className="bg-magenta-500 hover:bg-magenta-700 text-white font-bold py-2 px-4 rounded-full mb-4" onClick={connectWallet}>Connect Wallet</button>
                            )
                        }
                        {
                            profile.picture?.__typename === 'MediaSet' && (
                                <Image
                                    width="200"
                                    height="200"
                                    alt={profile.handle}
                                    className='rounded-full border-4 border-turquoise-500 mb-4'
                                    src={formatPicture(profile.picture)}
                                />
                            )
                        }
                        {
                            connected && (
                                <button
                                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full mt-4"
                                    onClick={followUser}
                                >Follow {profile.handle}</button>
                            )
                        }
                        <h1 className="text-3xl font-semibold mb-2">{profile.handle}</h1>
                        <h3 className="text-xl font-medium text-gray-500 mb-4">{profile.bio}</h3>
                        <Publications profile={profile} />
                    </div>
                </div>
            </div>
        </>
    )
}

function Publications({ profile }: { profile: any }) {
    let { data: publications } = usePublications({
        profileId: profile.id,
        limit: 10,
    })
    console.log(profile.id)
    publications = publications?.map(publication => {
        if (publication.__typename === 'Mirror') {
            return publication.mirrorOf
        } else {
            return publication
        }
    })

    return (
        <div className="mt-4 w-full">
            {
                publications?.map((pub: any, index: number) => (
                    <div key={index} className="bg-gray-50 rounded-xl px-6 py-4 mb-4 shadow-md">
                        <p className="text-gray-600 mb-4">{pub.metadata.content}</p>
                        {
                            pub.metadata?.media[0]?.original && ['image/jpeg', 'image/png'].includes(pub.metadata?.media[0]?.original.mimeType) && (
                                <Image
                                    width="400"
                                    height="400"
                                    alt={profile.handle}
                                    className='rounded-xl'
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