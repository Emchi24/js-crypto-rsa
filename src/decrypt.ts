import { bigIntBlocksToString } from "./math/bigIntBlocksToString";
import largeNumberModPow from "./math/largeNumberModPow";


export default async function decrypt(toDecrypt: string[][], key: bigint, n: bigint): Promise<string> {
    let decryptedBlocks: bigint[][] = []
    toDecrypt.forEach(block => {
        const decryptedValues = largeNumberModPow(BigInt(block[0]), key, n)
        const decryptedLength = largeNumberModPow(BigInt(block[1]), key, n)
        const decryptedBlock = [decryptedValues, decryptedLength]
        decryptedBlocks.push(decryptedBlock)
    })

    return bigIntBlocksToString(decryptedBlocks)
}