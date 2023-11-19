import { ConnectButton } from '@/components/connect-button';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-center">
      <div className='flex justify-center items-center bg-primary w-full p-4'>
        <ConnectButton />
      </div>


    </main>
  )
}
