import { decryptMessage } from "../../../dist/index.js"
import stringToObject from "../convertStringToObject"
import objectToString from "../convertObjectToString"

export default async function decryptionWorker(args: any[]) {
  const encryptedText = args[0]
  const publicKey = args[1]
  const privateKey = args[2]
  const originalText = args[3]

    const decrypedText = await decryptMessage(encryptedText, privateKey)
    
    return {
        "encryptedText": encryptedText,
        "publicKey": publicKey,
        "privateKey": privateKey,
        "decryptedText": decrypedText,
        "originalText": originalText
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