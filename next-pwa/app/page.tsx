"use client";

import { ProfileId, useLogin, useProfiles } from "@lens-protocol/react-web";
import { useLensHelloWorld } from "@/context/LensHelloWorldContext";
import { useEffect, useState } from "react";
import { LoginData } from "@/lib/types";
import { Button } from '@/components/ui/button'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { LogIn } from 'lucide-react'

export default function Home() {
  const { address, handle, connect } = useLensHelloWorld();
  const { open } = useWeb3Modal()
  const { execute: executeLogin, data: loginData } = useLogin();
  const [connected, setConnected] = useState(false)
  
  useEffect(() => {
    setConnected(true)
  }, [])
  
  useEffect(() => {
    if (loginData) {
      connect(loginData as LoginData);
    }
  }, [connect, loginData])

  async function logIn({ address, profileId }: { address: string, profileId: ProfileId }) {
    try {
      await executeLogin({ address, profileId })
      if (!loginData) return
      connect({ ...loginData } as LoginData)
    } catch (err) {
      console.log('err: ', err)
    }
  }

  if(!connected) return (
    <div className="flex flex-1 justify-center items-center flex-col bg-gradient-to-tl bg-[conic-gradient(var(--tw-gradient-stops))] from-indigo-200 via-red-200 to-yellow-100 h-screen w-screen"></div>
  )
  return (
    <Profiles
      address={address}
      handle={handle}
      executeLogin={logIn}
      open={open}
    />
  )
}

function Profiles({
  address, handle, executeLogin
}: any) {
  const { data: profiles } = useProfiles({
    where: {
      ownedBy: [address],
    }
  })

  const showNoLensProfiles =
    address && !handle && profiles && profiles.length === 0;
  const showSignInWithLens =
    address && !handle && profiles && profiles.length > 0;

  return (
    <div className="flex flex-1 justify-center items-center flex-col bg-gradient-to-tl bg-[conic-gradient(var(--tw-gradient-stops))] from-indigo-200 via-red-200 to-yellow-100 h-screen w-screen">

      <h1 className="text-5xl font-bold text-black mb-20">
        🏝️ Oasis PWA 🤖
      </h1>

      {showNoLensProfiles && <p>No Lens Profiles found for this address</p>}
      {showSignInWithLens && (
        <Button
          variant='outline'
          className="my-4"
          onClick={() => executeLogin({ address, profileId: profiles[0].id })}
        >
          <LogIn className="mr-2 h-6 w-6" />
          Sign in with {profiles[0].handle?.localName}.lens
        </Button>
      )
      }
    </div>
  )
}