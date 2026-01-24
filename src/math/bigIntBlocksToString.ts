export function bigIntToString(block: bigint[]): string {
    let chars: string[] = []
    let encodedCharCodeChain = block[0]
    let encodedCharLengthChain = block[1]
    const decoder = new TextDecoder()

    while (encodedCharCodeChain > 0n) {
        
        const currentCharBytesLength = Number(encodedCharLengthChain & 0xFFn) // Extract the last byte of length, which stores the number of bytes for the current character
        
        // build mask for extraction of the last value
        const mask = (1n << BigInt(currentCharBytesLength * 8)) - 1n // Shift 1 left by charBytes*8 bits, then subtract 1 to create a mask of all 1s (000 0000 1111 1111 ...)

        /*
        example of mask: charbytes * 8 = 16
  
          0000 0001 0000 0000  // 0000 0000 are the bits added to 1 via the bitswift 
        - 0000 0000 0000 0001
        --------------------- 
                  1 1111 111   // those are the bits we have to borrow 
         ---------------------
          0000 0000 1111 1111      
        */

        let charComposition = encodedCharCodeChain & mask // etxract the last charbytes

        const Unit8ArrayNumbers: number[] = []
        
        // extract bytes into individuals  
        for (let i = 0; i < currentCharBytesLength; i++) {
            Unit8ArrayNumbers.unshift(Number(charComposition & 0xFFn)) // extract and convert last byte to a number 
            charComposition >>= 8n // swift to the right, witch will remove the current already processed byte
        }

        // decode the UTF-8 decoded bytes back to the character
        chars.unshift(decoder.decode(new Uint8Array(Unit8ArrayNumbers)))

        encodedCharCodeChain >>= BigInt(currentCharBytesLength * 8) // Remove the processed character bytes from value
        encodedCharLengthChain >>= 8n // Remove the processed length byte
        }

    return chars.join("")
}

export function bigIntBlocksToString(blocks: bigint[][]): string {
    let original = ""
    for (const block of blocks) {
        original += bigIntToString(block)
    }
    return original
}
