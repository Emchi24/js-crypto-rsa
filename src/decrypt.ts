import bigIntBlocksToString from "./math/bigIntBlocksInString";
import largeNumberModPow from "./math/largeNumberPow";

export default async function decrypt(toDecrypt: bigint[], key: bigint, n: bigint,): Promise<string> {
    let decryptedBlocks: bigint[] = []
    toDecrypt.forEach(block => {
        const decryptedBlock = largeNumberModPow(block, key, n)
        decryptedBlocks.push(decryptedBlock)
    })
    return bigIntBlocksToString(decryptedBlocks)
}