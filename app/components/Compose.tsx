'use client'
import React from 'react';
import { useActiveWallet, useCreatePost, ContentFocus, CollectPolicyType, ProfileOwnedByMe } from '@lens-protocol/react-web';
import { create } from 'ipfs-http-client';

/* configure Infura auth settings */
const projectId = "2PkzI0wyR3M08EkxAlr4jMXxDZ1"
const projectSecret = "ee305476603c7936b7ec8bf995a55f59"
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64')

const client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    }
})

interface Props {
    publisher: ProfileOwnedByMe;
}

const Compose = ({ publisher }: Props) => {
    async function upload(postData: any) {
        const added = await client.add(JSON.stringify(postData))
        const uri = `ipfs://${added.path}`
        console.log('uri: ', uri)
        return uri
    };
    const { execute: create, error, isPending } = useCreatePost({ publisher, upload });
    const { data: wallet, loading: walletLoading } = useActiveWallet();

    const onSubmit = async () => {
        await create({
            content: "My first video",
            contentFocus: ContentFocus.VIDEO,
            locale: 'en',
            collect: {
                type: CollectPolicyType.FREE,
                followersOnly: false,
                metadata: {
                    name: "livepeer-id",
                    description: "videoid_559dz7d9mjq27hwr",
                    attributes: [],
                }
            },
        });
    };
    if (isPending) {
        return <p>Creating post...</p>;
    }
    if (error) {
        console.log(error);
        return <p>Error: {error.message}</p>;
    }
    if (wallet) {
        console.log(wallet);
        return (
            <div>
                <p>You are logged-in with {wallet.address}</p>
                <button onClick={onSubmit}>save</button>
            </div>
        );
    }

    return (
        <div>
            <h1>Homes</h1>
            <p>You are logged-out</p>
        </div>
    );
}

export default Compose;