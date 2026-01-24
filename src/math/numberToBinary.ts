export default function numberToBinary(number: bigint): string {

    if (number === 0n) {
        return "00000000"
    }

    let x = number
    let unpaddedBinaryString = ""

    while (x !== 0n) {
        if (x % 2n === 0n) {
            unpaddedBinaryString += "0"
        } else {
            unpaddedBinaryString += "1"
        }
        x /= 2n
    }

    
    const len = unpaddedBinaryString.length
    const remainder = len % 8
    let padding = ""

    if (remainder !== 0) {
        const paddingCount = 8 - remainder
        padding = "0".repeat(paddingCount)
    }

    return padding + unpaddedBinaryString
}

