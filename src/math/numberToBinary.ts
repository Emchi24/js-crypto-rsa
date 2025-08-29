export default function numberToBinary(number: bigint): string {

    if (number === 0n) {
        return "00000000"
    }

    let x = number
    let tempBinaryString = ""

    while (x !== 0n) {
        if (x % 2n === 0n) {
            tempBinaryString += "0"
        } else {
            tempBinaryString += "1"
        }
        x /= 2n
    }

    let unpaddedBinaryString = ""
    for (let i = tempBinaryString.length - 1; i >= 0; i--) {
        unpaddedBinaryString += tempBinaryString[i]
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

