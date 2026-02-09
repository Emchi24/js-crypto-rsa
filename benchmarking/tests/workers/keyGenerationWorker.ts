import { generateKeyPair } from "../../../dist"

export default async function keyGenerationWorker(keySize: number) {
    const [publicKey, privateKey] = await generateKeyPair(keySize)
}
