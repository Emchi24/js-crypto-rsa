import { stringToBigIntBlocks } from "./math/stringToBigIntBlocks"
import largeNumberModPow from "./math/largeNumberPow"
import numberToBinary from "./math/numberToBinary"

export default async function encrypt(toEncrypt: string, key: bigint, n: bigint): Promise<bigint[][]> {
    const nLength= numberToBinary(n).length
    const blocks = stringToBigIntBlocks(toEncrypt, nLength - 1)
    const encryptedBlocks: bigint[][] =  []
    blocks.forEach(block => {
        const encryptedBlockValue = largeNumberModPow(block[0], key, n)
        const encryptedBlockLength = largeNumberModPow(block[1], key, n)
        const encryptedBlock = [encryptedBlockValue, encryptedBlockLength]
        encryptedBlocks.push(encryptedBlock)
    }) 
    return encryptedBlocks
}
