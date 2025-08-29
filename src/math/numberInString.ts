import numberToBinary from "./numberToBinary";
import binaryToNumber from "./binaryToNumber";

export default function numberInString(number: bigint) {
    const binaryString = numberToBinary(number)
    let splitBinaryString = ""
    let finalString = ""
    
    for (let i = 0; i < binaryString.length; i++) {
        splitBinaryString += binaryString[i]
    
        if ((i + 1) % 8 === 0) {
            const charCode = binaryToNumber(splitBinaryString)
            const char = String.fromCharCode(Number(charCode))
            finalString += char
            splitBinaryString = ""
        }
    }
    
    return finalString
}