import largePow from "./largePow"

export default function binaryToNumber(binary: string): bigint {
    let k = BigInt(binary.length)
    let result = 0n
    for (let i = 0; i < binary.length; i++) {
        k--
        const y = largePow(2n, k)
        const temp = BigInt(binary[i]) * y
        result += temp

    }
    return result
}

