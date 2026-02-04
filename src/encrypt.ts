import { stringToBigIntBlocks } from "./math/stringToBigIntBlocks"
import largeNumberModPow from "./math/largeNumberModPow"


export default async function encrypt(toEncrypt: string, key: bigint, n: bigint, maxBitsPerBlock: number): Promise<bigint[][]> {
    const keyLength = key.toString(2).length

    if (maxBitsPerBlock > keyLength) {
        throw Error("encoded message is larger than the key")
    }
    const blocks = stringToBigIntBlocks(toEncrypt, maxBitsPerBlock)
    const encryptedBlocks: bigint[][] =  []
    blocks.forEach(block => {
        const encryptedBlockValue = largeNumberModPow(block[0], key, n)
        const encryptedBlockLength = largeNumberModPow(block[1], key, n)
        const encryptedBlock = [encryptedBlockValue, encryptedBlockLength]
        encryptedBlocks.push(encryptedBlock)
    }) 
    return encryptedBlocks
}
