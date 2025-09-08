export function stringToBigIntBlocks(msg: string, nLength: number): [bigint, bigint][] {
    const maxBitsPerBlock = nLength - 1
    if (maxBitsPerBlock < 64) {
        throw new Error("n is not big enough to safely encrypt a message")
    }

    const blocks: [bigint, bigint][] = []
    let bitCounter = 0
    let CharCodes = 0n
    let CharCodesComposition = 0n

    for (let i = 0; i < msg.length; i++) {
        const encoder = new TextEncoder()
        const bytes = encoder.encode(msg[i])
        let charCode = 0n

        for (let k = 0; k < bytes.length; k++) {
            charCode = (charCode << 8n) | BigInt(bytes[k])
        }

        if (bitCounter + bytes.length * 8 > 40) {
            blocks.push([CharCodes, CharCodesComposition])
            bitCounter = 0
            CharCodes = 0n
            CharCodesComposition = 0n
        }

        CharCodes = (CharCodes << BigInt(bytes.length * 8)) | charCode
        CharCodesComposition = (CharCodesComposition << 8n) | BigInt(bytes.length)
        bitCounter += bytes.length * 8
    }

    if (bitCounter > 0) {
        blocks.push([CharCodes, CharCodesComposition])
    }

    return blocks
}
