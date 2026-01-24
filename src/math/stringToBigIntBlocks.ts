export function stringToBigIntBlocks(msg: string, nLength: number): [bigint, bigint][] {
    const maxBitsPerBlock = nLength - 1
    if (maxBitsPerBlock < 32) {
        throw new Error("n must be at least 32")
    }

    const blocks: [bigint, bigint][] = []
    let bitCounter = 0 // ceep track of how many bits are in current block
    let encodedCharCodeChain = 0n // char codes compressed together  
    let encodedCharLengthChain = 0n // store how many bytes each charackter contains to decode it back to original form

    for (let i = 0; i < msg.length; i++) {
        const encoder = new TextEncoder()
        const bytes = encoder.encode(msg[i])
        let charCode = 0n

        for (let k = 0; k < bytes.length; k++) {
            charCode = (charCode << 8n) | BigInt(bytes[k])
            /*
            Shift the current character code 8 bits to the left to make room,
            then insert the next byte into the lower 8 bits using bitwise OR
            */  
        }

        if (bitCounter + bytes.length * 8 > maxBitsPerBlock) {
            blocks.push([encodedCharCodeChain, encodedCharLengthChain])
            bitCounter = 0
            encodedCharCodeChain = 0n
            encodedCharLengthChain = 0n
        }

        encodedCharCodeChain = (encodedCharCodeChain << BigInt(bytes.length * 8)) | charCode 
        encodedCharLengthChain = (encodedCharLengthChain << 8n) | BigInt(bytes.length) // ceep track of the length of each UTF-8 encodeing
        bitCounter += bytes.length * 8
    }
    
    if (bitCounter > 0) {
        blocks.push([encodedCharCodeChain, encodedCharLengthChain])
    }

    return blocks
}
