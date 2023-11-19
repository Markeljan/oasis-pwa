"use client";

import Image from "next/image";
import { useState } from "react";
import {
  lensHubProxyAddress,
  openActionContractAddress,
  blockExplorerLink,
} from "@/lib/constants";
import { lensHubAbi } from "@/lib/lensHubAbi";
import { useWalletClient } from "wagmi";
import { PostCreatedEventFormatted } from "@/lib/types";
import { fetchInitMessage } from "@/lib/fetchInitMessage";
import { useLensHelloWorld } from "../context/LensHelloWorldContext";
import { encodeAbiParameters, encodeFunctionData } from "viem";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { publicClient } from "@/providers/wallet-provider";
import { SearchIcon } from "lucide-react";
import { isValidUrl } from "@/lib/utils";
import Link from "next/link";

const ActionBox = ({
  post,
  address,
  profileId,
  refresh,
}: {
  post: PostCreatedEventFormatted;
  address?: `0x${string}`;
  profileId?: number;
  refresh: () => void;
}) => {
  const [actionText, setActionText] = useState<string>("");
  const [createState, setCreateState] = useState<string | undefined>();
  const [txHash, setTxHash] = useState<string | undefined>();
  const { data: walletClient } = useWalletClient();
  const imageUrl = isValidUrl(post.args.postParams.contentURI) ? post.args.postParams.contentURI : '/oasis.png';


  const execute = async (
    post: PostCreatedEventFormatted,
    actionText: string
  ) => {
    const encodedActionData = encodeAbiParameters(
      [{ type: "string" }],
      [actionText]
    );

    const args = {
      publicationActedProfileId: BigInt(post.args.postParams.profileId || 0),
      publicationActedId: BigInt(post.args.pubId),
      actorProfileId: BigInt(profileId || 0),
      referrerProfileIds: [],
      referrerPubIds: [],
      actionModuleAddress: openActionContractAddress as `0x${string}`,
      actionModuleData: encodedActionData as `0x${string}`,
    };

    const calldata = encodeFunctionData({
      abi: lensHubAbi,
      functionName: "act",
      args: [args],
    });

    setCreateState("PENDING IN WALLET");
    try {
      const hash = await walletClient!.sendTransaction({
        to: lensHubProxyAddress,
        account: address,
        data: calldata as `0x${string}`,
      });
      setCreateState("PENDING IN MEMPOOL");
      setTxHash(hash);
      const result = await publicClient.waitForTransactionReceipt({ hash });
      if (result.status === "success") {
        setCreateState("SUCCESS");
        refresh();
      } else {
        setCreateState("CREATE TXN REVERTED");
      }
    } catch (e) {
      setCreateState(`ERROR: ${e instanceof Error ? e.message : String(e)}`);
    }
  };

  return (
    <div className="flex flex-col border rounded-xl px-5 py-3 mb-3 justify-center pt-10">
      <div className="flex flex-col justify-center items-center">
        <p>ProfileID: {post.args.postParams.profileId}</p>
        <p>PublicationID: {post.args.pubId}</p>
        <p>
          Initialize Message: {fetchInitMessage(post)}
        </p>
        <Image
          className="my-3 rounded-2xl"
          src={imageUrl}
          alt="Post"
          width={300}
          height={300}
        />
        <Button asChild variant='link'>
          <Link
            href={`${blockExplorerLink}${post.transactionHash}`}
            target="_blank"
          >
            Txn Link
          </Link>
        </Button>

      </div>
      <div >
        <p className="mb-3">
          Action message (will be emitted in HelloWorld event)
        </p>
        <Input
          id={`initializeTextId-${post.args.pubId}`}
          type="text"
          value={actionText}
          onChange={(e) => setActionText(e.target.value)}
          disabled={!profileId}
        />
      </div>
      {profileId && (
        <Button
          className="mt-3"
          onClick={() => execute(post, actionText)}
        >
          Post Message
        </Button>
      )}
      {createState && <p className="mt-2 text-primary text-center">{createState.substring(0, 18) + "..."}</p>}
      {txHash && (
        <Button asChild variant='link'>
        <Link href={`${blockExplorerLink}${txHash}`} target="_blank">
          Block Explorer Link
        </Link>
        </Button>
      )}
    </div>
  );
};

export default function Actions() {
  const [filterOwnPosts, setFilterOwnPosts] = useState(false);
  const { address, profileId, posts, refresh, loading } = useLensHelloWorld();

  let filteredPosts = filterOwnPosts
    ? posts.filter(
      (post) => post.args.postParams.profileId === profileId?.toString()
    )
    : posts;

  filteredPosts = filteredPosts.sort((a, b) => {
    const blockNumberA = parseInt(a.blockNumber, 10);
    const blockNumberB = parseInt(b.blockNumber, 10);
    return blockNumberB - blockNumberA;
  });

  return (
    <div className="postBox flex flex-col justify-enter items-center bg-gradient-to-tl bg-[conic-gradient(var(--tw-gradient-stops))] from-indigo-200 via-red-200 to-yellow-100 h-screen w-screen pb-10">
      {
        address && profileId && (
          <div className="my-3">
            <input
              type="checkbox"
              id="filterCheckbox"
              className="mr-3"
              checked={filterOwnPosts}
              onChange={(e) => setFilterOwnPosts(e.target.checked)}
            />
            <label htmlFor="filterCheckbox">
              Filter only posts from my profile
            </label>
          </div>
        )
      }
      <div className="flex flex-col pt-8 pb-20 gap-4">
        {loading && <div className="spinner" />}
        {filteredPosts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-screen pb-24">
            <SearchIcon className="h-20 w-20 mb-10" />
            <p className="text-2xl">No Posts</p>
            <p className="text-2xl">Create one!</p>
          </div>
        ) : (
          filteredPosts.map((post, index) => (
            <div key={index} className="">
              <ActionBox
                key={index}
                post={post}
                address={address}
                profileId={profileId}
                refresh={refresh}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};
