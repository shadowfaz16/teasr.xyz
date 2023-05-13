'use client'
import { useWalletLogin, useWalletLogout, useActiveProfile } from '@lens-protocol/react-web';
import Image from 'next/image';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import {formatPicture} from "../utils"
import Link from 'next/link';
import { MdAddCircleOutline } from 'react-icons/md';

const LoginButton = () => {
    const { execute: login, error: loginError, isPending: isLoginPending } = useWalletLogin();
    const { execute: logout, isPending } = useWalletLogout();

    const { isConnected } = useAccount();
    const { disconnectAsync } = useDisconnect();

    const { connectAsync } = useConnect({
        connector: new InjectedConnector(),
    });

    const onLoginClick = async () => {
        if (isConnected) {
            await disconnectAsync();
        }

        const { connector } = await connectAsync();

        if (connector instanceof InjectedConnector) {
            const signer = await connector.getSigner();
            await login(signer);
        }
    };
    const { data, error, loading } = useActiveProfile();

    if (loading) {
        return <p>Loading...</p>;
    }

    if (data) {
        console.log(data)
        return (

        <div className='flex items-center space-x-4'>
                {/* <button disabled={isPending} onClick={logout} className='inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white bg-gradient-to-r from-teal-400 to-magenta-500 hover:from-magenta-500 hover:to-teal-400'>Log out</button> */}
                <div className='flex items-center space-x-2 text-xs px-5 py-2.5 leading-none font-bold border rounded text-white border-white bg-gradient-to-r from-teal-400 to-magenta-500 hover:from-magenta-500 hover:to-teal-400 animate-gradient'>
                    <MdAddCircleOutline size={16} />
                    <Link href="/new-teasr" className='flex'>
                        NEW TEASR</Link>
                </div>
            <Link href={'/profile'}>
                <Image
                width={32}
                height={32} 
                className='inline-block h-8 w-8 rounded-full ring-2 ring-white'
                src={ formatPicture(data?.picture) }
                alt={data.handle}
                />
            </Link>
        </div>
        );
    }

    return (
        <div className='flex'>
            {/* {loginError && <p>{loginError}</p>} */}
            <button disabled={isLoginPending} onClick={onLoginClick}
                className='inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white'
            >Log in</button>
        </div>
    );
}

export default LoginButton;
