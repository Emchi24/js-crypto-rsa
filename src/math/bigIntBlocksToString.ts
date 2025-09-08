export function bigIntToString(block: bigint[]): string {
    let chars: string[] = []
    let value = block[0]
    let length = block[1]
    const decoder = new TextDecoder()

    while (length > 0n) {
        const charBytes = Number(length & 0xFFn)
        // build mask for extraction of the last value
        const mask = (1n << BigInt(charBytes * 8)) - 1n

        let charComposition = value & mask

        const Unit8ArrayNumbers: number[] = []
        for (let i = 0; i < charBytes; i++) {
            Unit8ArrayNumbers.unshift(Number(charComposition & 0xFFn))
            charComposition >>= 8n
        }

        chars.unshift(decoder.decode(new Uint8Array(Unit8ArrayNumbers)))

        value >>= BigInt(charBytes * 8)
        length >>= 8n
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
