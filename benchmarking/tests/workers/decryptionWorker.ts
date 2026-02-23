import { decryptMessage } from "../../../dist/index.js"
import stringToObject from "../convertStringToObject"
import objectToString from "../convertObjectToString"

export default async function decryptionWorker(args: any[]) {
    const publicKey  = args[0]
    const privateKey =  args[1]
    const encryptedText = args[2]

    const decrypedText = await decryptMessage(encryptedText, privateKey)
    
    return {
        "encryptedText": encryptedText,
        "publicKey": publicKey,
        "privateKey": privateKey,
        "decryptedText": decrypedText
    }
}

process.on("message", async (message: any[]) => {
        const converted = message?.map((value) => {
            if (typeof value == "string") {
                return stringToObject(value)
            }
            return value
        })
    const result =  await decryptionWorker(converted[0])
    process.send?.(objectToString(result), (error) => {
        if (error != null) {
            console.log(`Error trying to send results back to parent process: ${error}`)
        }
    })

})