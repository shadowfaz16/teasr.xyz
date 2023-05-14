'use client'
import './globals.css'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { mainnet, polygon } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { LensProvider, LensConfig, production, useWalletLogin } from '@lens-protocol/react-web'
import { bindings as wagmiBindings } from '@lens-protocol/wagmi'
const { provider, webSocketProvider } = configureChains([polygon, mainnet], [publicProvider()])
import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from '@livepeer/react';
import { ApolloProvider } from "@apollo/client";
import apolloClient from "../apolloClient"; 

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

const livepeerClient = createReactClient({
  provider: studioProvider({
    apiKey: process.env.NEXT_PUBLIC_STUDIO_API_KEY as string,
  }),
});

const lensConfig: LensConfig = {
  bindings: wagmiBindings(),
  environment: production,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ApolloProvider client={apolloClient}>
      <html lang="en">
        <WagmiConfig client={client}>
          <LensProvider config={lensConfig}>
            <LivepeerConfig client={livepeerClient}>
              <body>{children}</body>
            </LivepeerConfig>
          </LensProvider>
        </WagmiConfig>
      </html>
    </ApolloProvider>
  )
}