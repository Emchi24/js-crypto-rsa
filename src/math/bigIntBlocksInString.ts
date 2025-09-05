import numberToBinary from "./numberToBinary";
import binaryToNumber from "./binaryToNumber";
import { stringToBigIntBlocks } from "./StringToBigIntBlocks";

 function bigIntToString(value: bigint): string {
    let chars: string[] = []
    while (value > 0n) {
        const charCode = Number(value & 0xFFn)
        chars.unshift(String.fromCharCode(charCode))
        value >>= 8n
    }
    return chars.join("")
}

export default function bigIntBlocksToString(blocks: bigint[]): string {
    let original = ""
    blocks.forEach(block => {
        const substring = bigIntToString(block)
        original += substring
    })
    return original
}