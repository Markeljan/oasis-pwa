"use client"

import Link from "next/link";
import { ConnectButton } from "./connect-button";
import { Button } from "./ui/button";
import { Activity, BotIcon, HomeIcon, Rows } from "lucide-react";

export function NavOverlay() {

    return (
        <>
            <div
                className="fixed top-0 flex justify-center items-center bg-primary rounded-b-2xl w-full pt-2 pb-3 z-10"
            >
                <Link href="/">
                    <Button>
                        <HomeIcon className="mr-4 h-6 w-6" />
                    </Button>
                </Link>
                <ConnectButton />
            </div>
            <div
                className="fixed bottom-0 flex justify-between items-center bg-primary rounded-t-2xl w-full py-8 px-6 z-10"
            >
                <Link href="/agents">
                    <Button>
                        <BotIcon className="mr-2 h-6 w-6" />
                        Agents
                    </Button>
                </Link>
                <Link href="/posts">
                    <Button>
                        <Rows className="mr-2 h-6 w-6" />
                        Posts
                    </Button>
                </Link>
                <Link href="/signal">
                    <Button>
                        <Activity className="mr-2 h-4 w-4" />
                        Signals
                    </Button>
                </Link>
            </div>
        </>
    );
};
