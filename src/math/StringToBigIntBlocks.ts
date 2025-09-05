import binaryToNumber from "./binaryToNumber"


export function stringToBigIntBlocks(msg: string, nLength: number): bigint[] {
    const maxBitsPerBlock = nLength - 1
    const blocks: bigint[] = []
    let currentBlock = 0n
    let currentBits = 0

    for (let i = 0; i < msg.length; i++) {
        const charCode = BigInt(msg.charCodeAt(i))

        if (currentBits + 8 > maxBitsPerBlock) {
            blocks.push(currentBlock)
            currentBlock = 0n
            currentBits = 0
        }

        currentBlock = (currentBlock << 8n) | charCode
        currentBits += 8
    }
    if (currentBits > 0) {
        blocks.push(currentBlock)
    }

    return blocks
}


