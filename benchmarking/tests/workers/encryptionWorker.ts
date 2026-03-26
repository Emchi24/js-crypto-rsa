import { encryptMessage } from "../../../dist/index"
import stringToObject from "../../../src/convertStringToObject"
import objectToString from "../../../src/convertObjectToString"

export default async function encryptionWorker(args: any[]) {
    const publicKey = args[0]
    const privateKey =  args[1]
    const text = args[2]
    const encryptedText = await encryptMessage(text, publicKey)
    return {
        "privateKey": privateKey,
        "publicKey": publicKey,
        "encryptedText": encryptedText,
        "originalText": text,
        "args": args
    }
}

process.on("message", async (message: any[]) => {
        const converted = message?.map((value) => {
            if (typeof value == "string") {
                return stringToObject(value)
            }
            return value
        })
    const result =  await encryptionWorker(converted[0])
    process.send?.(objectToString(result), (error) => {
        if (error != null) {
            console.log(`Error trying to send results back to parent process: ${error}`)
        }
    })

})
