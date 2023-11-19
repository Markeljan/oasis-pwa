import { decodeAbiParameters, parseAbiParameters } from 'viem'
import { openActionContractAddress } from "./constants";
import { PostCreatedEventFormatted } from "./types";

export const fetchInitMessage = (post: PostCreatedEventFormatted) => {
    const actionModules = post.args.postParams.actionModules;
    const index = actionModules.indexOf(openActionContractAddress);
    const actionModuleInitData = post.args.postParams.actionModulesInitDatas[index];

    const encodedInitData = decodeAbiParameters(
        parseAbiParameters(["string"]),
        actionModuleInitData as `0x${string}`
    );
    return encodedInitData;
}