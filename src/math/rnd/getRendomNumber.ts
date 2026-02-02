export default function getRendomNumber(NumLenBits: number, oddNumber: boolean): bigint {
    const bytesArray: Uint8Array = new Uint8Array(NumLenBits)

    // generate as many cryptografic random numbers as you want the bigger random number to be long
    const rNumbArray: Uint8Array = globalThis.crypto.getRandomValues(bytesArray) 
    
    let bitString: string = ""
    
    if (oddNumber) {

        // set LSB (least significant bit) low for odd number
        rNumbArray[NumLenBits - 1] |= 1
    }

    rNumbArray.forEach((rendomNum: number) => {
        
        // get last bit 
        const bit = rendomNum & 1  
        bitString += bit.toString()
    })
    const bigNum: bigint = BigInt("0b" + bitString)
    return bigNum
}