"use client";

import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'

import { WagmiConfig } from 'wagmi'
import { polygonMumbai } from 'viem/chains'

const projectId = `${process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID}`

const metadata = {
    name: 'Oasis Dapp',
    description: 'Lens Protocol Dapp with smart-posts',
    url: 'https://oasisdapp.vercel.app',
    icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [polygonMumbai]
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

createWeb3Modal({ wagmiConfig, projectId, chains })

export function Web3Modal({ children }: { children: React.ReactNode }) {
    return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}