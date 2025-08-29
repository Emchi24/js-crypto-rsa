import binaryToNumber from "./binaryToNumber"

export default function stringInNumber(msg: string) {
    let binaryString = ""
    for (let i = 0; i< msg.length; i++) {
        const charCode = msg.charCodeAt(i)
        const charBinary = charCode.toString(2).padStart(8, "0")
        binaryString += charBinary
    }
    const number = binaryToNumber(binaryString)
    return number
}

