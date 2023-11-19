"use client"

import { useState } from "react";
import { useLensHelloWorld } from "../context/LensHelloWorldContext";
import { blockExplorerLink } from "@/lib/constants";
import { XIcon } from "lucide-react";
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
      <div className="flex pt-24">
        <Input
          className="w-1/4"
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
            <div key={index} className="border p-3 rounded-xl mt-3 w-[500px]">
              <p className="font-geist-medium">{event.args.message}</p>
              <div className="inline-content">from</div>
              <div className="inline-content">{event.args.actor}</div>
              <div className="header-text">
                <a href={`${blockExplorerLink}${event.transactionHash}`}>Link</a>
              </div>
            </div>
          ))
        )
      }
    </div >
  );
};
