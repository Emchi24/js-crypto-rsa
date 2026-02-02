import { stringToBigIntBlocks } from "./math/stringToBigIntBlocks"
import largeNumberModPow from "./math/largeNumberPow"


export default async function encrypt(toEncrypt: string, key: bigint, n: bigint): Promise<bigint[][]> {

    const blocks = stringToBigIntBlocks(toEncrypt, 128)
    const encryptedBlocks: bigint[][] =  []
    blocks.forEach(block => {
        const encryptedBlockValue = largeNumberModPow(block[0], key, n)
        const encryptedBlockLength = largeNumberModPow(block[1], key, n)
        const encryptedBlock = [encryptedBlockValue, encryptedBlockLength]
        encryptedBlocks.push(encryptedBlock)
    }) 
    return encryptedBlocks
}
