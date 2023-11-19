"use client"

import { useState } from "react";
import { useLensHelloWorld } from "../context/LensHelloWorldContext";
import { blockExplorerLink } from "@/lib/constants";
import { Link, XIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Signals() {
  const [filterOwnEvents, setFilterOwnEvents] = useState(false);
  const { greetings, loading, address } = useLensHelloWorld();

  let filteredEvents = filterOwnEvents
    ? greetings.filter((greet) => greet.args.actor === address)
    : greetings;

  filteredEvents = filteredEvents.sort((a, b) => {
    const blockNumberA = parseInt(a.blockNumber, 10);
    const blockNumberB = parseInt(b.blockNumber, 10);
    return blockNumberB - blockNumberA;
  });

  return (
    <div className="flex flex-col items-center bg-gradient-to-tl bg-[conic-gradient(var(--tw-gradient-stops))] from-indigo-200 via-red-200 to-yellow-100 h-screen w-screen">
      <div className="flex md:flex-row pt-24">
        <Input
          className="flex md:w-1/4 text-enter"
          type="checkbox"
          id="filterCheckbox"
          checked={filterOwnEvents}
          onChange={(e) => setFilterOwnEvents(e.target.checked)} />
        <label className="w-3/4" htmlFor="filterCheckbox" >
          Filter only events from my address
        </label>
      </div>

      {loading && <div className="spinner" />}
      {
        filteredEvents.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-screen gap-2 pb-24">
            <XIcon className="h-20 w-20 mb-10" />
            <p className="text-2xl">No Signals found.</p>
          </div>
        ) : (
          filteredEvents.map((event, index) => (
            <div key={index} className="flex flex-col justify-center items-center text-center border p-3 rounded-xl mt-3 w-[500px]">
              <p className="font-geist-medium">{event.args.message.substring(0, 60)}</p>
              <div className="inline-content">from</div>
              <div className="inline-content">{`${event.args.actor.substring(0, 9)}...${event.args.actor.substring(0, 9)}`}</div>
              <div className="header-text">
                <Link href={`${blockExplorerLink}${event.transactionHash}`} target="_blank">Link</Link>
              </div>
            </div>
          ))
        )
      }
    </div >
  );
};
