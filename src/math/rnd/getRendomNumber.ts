import { webcrypto } from 'crypto';

export default function getRendomNumber(NumLenBits: number, oddNumber: boolean): bigint {
    const bytesArray: Uint8Array = new Uint8Array(NumLenBits)
    const rNumbArray: Uint8Array = webcrypto.getRandomValues(bytesArray) 
    
    let bitString: string = ""
    
    if (oddNumber) {
        rNumbArray[NumLenBits - 1] |= 0x01 // set LSB low for odd number
    }

    rNumbArray.forEach((rendomNum: number) => {
        const bit = rendomNum & 1 // get last bit 
        bitString += bit.toString()
    })
    const bigNum: bigint = BigInt("0b" + bitString)
    return bigNum
}