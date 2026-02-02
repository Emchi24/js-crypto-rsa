import { bigIntBlocksToString } from "./math/bigIntBlocksToString";
import largeNumberModPow from "./math/largeNumberModPow";


export default async function decrypt(toDecrypt: bigint[][], key: bigint, n: bigint): Promise<string> {
    let decryptedBlocks: bigint[][] = []
    toDecrypt.forEach(block => {
        const decryptedValues = largeNumberModPow(block[0], key, n)
        const decryptedLength = largeNumberModPow(block[1], key, n)
        const decryptedBlock = [decryptedValues, decryptedLength]
        decryptedBlocks.push(decryptedBlock)
    })

    return bigIntBlocksToString(decryptedBlocks)
}