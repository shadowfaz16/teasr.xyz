'use client'
import { Player, useAssetMetrics, useCreateAsset, useUpdateAsset } from '@livepeer/react';
import { useCallback, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Navbar from '../components/NavBar';
import { FiUpload } from 'react-icons/fi';
import { create } from 'ipfs-http-client'

import { useActiveProfile, useCreatePost, useActiveWallet, ContentFocus, CollectPolicyType } from '@lens-protocol/react-web';

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

const NewTeasr = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [collectionType, setCollectionType] = useState("");
    const [category, setCategory] = useState("");

    const [video, setVideo] = useState<File | undefined>();

    const { data: user, loading } = useActiveProfile();
    console.log('user:', user)



    const {
        mutate: createAsset,
        data: asset,
        progress,
        status,
        error,
    } = useCreateAsset(
        video
            ? {
                sources: [{ name: video.name, file: video }] as const,
            }
            : null,
    );
    const { data: metrics } = useAssetMetrics({
        assetId: asset?.[0].id,
        refetchInterval: 30000,
    });

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        if (acceptedFiles && acceptedFiles.length > 0 && acceptedFiles?.[0]) {
            setVideo(acceptedFiles[0]);
        }
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'video/*': ['*.mp4'],
        },
        maxFiles: 1,
        onDrop,
    });

    const isLoading = useMemo(
        () =>
            status === 'loading' ||
            (asset?.[0] && asset[0].status?.phase !== 'ready'),
        [status, asset],
    );

    const progressFormatted = useMemo(
        () =>
            progress?.[0].phase === 'failed'
                ? 'Failed to process video.'
                : progress?.[0].phase === 'waiting'
                    ? 'Waiting...'
                    : progress?.[0].phase === 'uploading'
                        ? `Uploading: ${Math.round(progress?.[0]?.progress * 100)}%`
                        : progress?.[0].phase === 'processing'
                            ? `Processing: ${Math.round(progress?.[0].progress * 100)}%`
                            : null,
        [progress],
    );

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setCollectionType("");
        setCategory("");
    }



    return (
        <div className=''>
            <Navbar />
            <div className='flex flex-wrap md:px-24 md:py-8'>
                {/* Left Column */}
                <div className="w-full md:w-1/2 p-4">
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="title">
                                Title
                            </label>
                            <input
                                className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-400 leading-tight bg-gray-900 focus:outline-none focus:shadow-outline placeholder:text-sm"
                                id="title"
                                type="text"
                                value={title}
                                placeholder='Title that describes your teasr'
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="description">
                                Description
                            </label>
                            <textarea
                                className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-400 leading-tight bg-gray-900 focus:outline-none focus:shadow-outline"
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <button className="bg-blue-5-lg00 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg bg-gray-900 focus:outline-none focus:shadow-outline">
                                Collection Type: <span className='text-xs'>FREE (for now)</span>
                            </button>
                        </div>
                    </form>
                        {
                            asset &&
                            <Compose publisher={user} asset={asset?.[0].playbackId} title={title} description={description} />
                        }
                </div>
                <div className="w-full md:w-1/2 p-4">
                    {!asset && (
                        <div
                            {...getRootProps()}
                            className="flex flex-col items-center justify-center h-64 bg-black border-2 rounded-xl border-dashed border-magenta-500 hover:border-turquoise-500 transition-colors duration-300 hover:bg-gray-900 hover:cursor-pointer"
                        >
                            <input {...getInputProps()} />
                            <FiUpload color='#FF00FF' size={40} />
                            <p className="text-white text-lg">Drag and drop or browse files</p>
                            {error?.message && <p className="text-yellow-500 mt-2">{error.message}</p>}
                        </div>
                    )}

                    {asset?.[0]?.playbackId && (
                        <Player title={asset[0].name} playbackId={asset[0].playbackId} />
                    )}

                    <div className="text-white pt-2">
                        {metrics?.metrics?.[0] && (
                            <p>Views: {metrics?.metrics?.[0]?.startViews}</p>
                        )}
                        {video ? <p>{video.name}</p> : <p>Select a video file to upload.</p>}
                        <p>{asset?.[0].playbackId}</p>
                        <p>{asset?.[0].playbackUrl}</p>
                        <p>{asset?.[0].storage?.ipfs?.cid}</p>
                        {progressFormatted && <p>{progressFormatted}</p>}
                        <div className='flex items-center space-x-2 mt-2'>
                            <button onClick={resetForm} className="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                Reset
                            </button>
                            {!asset?.[0].id && (
                                <button
                                    onClick={() => {
                                        createAsset?.();
                                    }}
                                    disabled={isLoading || !createAsset}
                                    className="px-4 py-2 bg-magenta-500 text-white hover:bg-turquoise-500 transition-colors duration-300 disabled:opacity-50 rounded-lg"
                                >
                                    Upload
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

function Compose({ publisher, asset, title, description },) {
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
            content: `${title}`,
            contentFocus: ContentFocus.TEXT,
            locale: 'en',
            collect: {
                type: CollectPolicyType.FREE,
                followersOnly: false,
                metadata: {
                    name: description,
                    description: asset,
                    attributes: [],
                }
            }
        });

    };
    if (wallet) {
        console.log(wallet);
        return (
            <div>
                <p>You are logged-in with {wallet.address}</p>
                <button
                    className='bg-gradient-to-r from-teal-400 to-magenta-500 text-white font-bold py-2 px-5 rounded mt-2'
                 onClick={onSubmit}>Post now</button>
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

export default NewTeasr;