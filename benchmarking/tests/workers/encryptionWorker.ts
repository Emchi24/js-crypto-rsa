import { encryptMessage } from "../../../dist/index"

export default async function encryptionWorker(prep: any[]) {
        const publicKey = prep[0]
        const privateKey =  prep[1]
        const text = prep[2]
        const encryptedText = await encryptMessage(text, publicKey)
        return {
            "privateKey": privateKey,
            "publicKey": publicKey,
            "encryptedText": encryptedText,
            "originalText": text
        }
}