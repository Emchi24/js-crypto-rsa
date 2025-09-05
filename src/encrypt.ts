import { stringToBigIntBlocks } from "./math/StringToBigIntBlocks"
import largeNumberModPow from "./math/largeNumberPow"
import numberToBinary from "./math/numberToBinary"

export default async function encrypt(toEncrypt: string, key: bigint, n: bigint): Promise<bigint[]> {
    const nLength= numberToBinary(n).length
    const blocks = stringToBigIntBlocks(toEncrypt, nLength - 1)
    const encryptedBlocks: bigint[] =  []
    blocks.forEach(block => {
        const encryptedBlock = largeNumberModPow(block, key, n)
        encryptedBlocks.push(encryptedBlock)
    }) 
    return encryptedBlocks
}
