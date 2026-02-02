export default function numberToBinary(number: bigint): string {

    if (number === 0n) {
        return "00000000"
    }

    let x = number
    let tempBinaryString = ""

    while (x !== 0n) {
        if (x % 2n === 0n) { // the last bit of every number (or LSB) is allways 0 if the number is even and 1 if it odd
            tempBinaryString += "0" 
        } else {
            tempBinaryString += "1"
        }
        x /= 2n // When dividing by 2 in binary, the last bit is removed
    }

    let unpaddedBinaryString = tempBinaryString.split("").reverse().join("") // reverse the binary string 

    const len = unpaddedBinaryString.length
    const remainder = len % 8
    let padding = ""

    if (remainder !== 0) {
        const paddingCount = 8 - remainder
        padding = "0".repeat(paddingCount)
    }

    return padding + unpaddedBinaryString
}


