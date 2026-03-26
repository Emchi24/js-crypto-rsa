import { generateKeyPair } from "../../../dist/index.js"
import stringToObject from "../../../src/convertStringToObject"
import objectToString from "../../../src/convertObjectToString"

export default async function keyGenerationWorker(keySize: number) {
    const [publicKey, privateKey] = await generateKeyPair(keySize)
    return {
        "publicKey": publicKey, 
        "privateKey": privateKey,
        "keysize": keySize
    }
}

process.on("message", async (message: any[]) => {
    console.log(message)
        const converted = message?.map((value) => {
            if (typeof value == "string") {
                return stringToObject(value)
            }
            return value
        })
    const result =  await keyGenerationWorker(converted[0])
    process.send?.(objectToString(result), (error) => {
        if (error != null) {
            console.log(`Error trying to send results back to parent process: ${error}`)
        }
    })

})