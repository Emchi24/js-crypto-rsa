import getRendomPrimeNumber from "./math/rnd/getRendomPrimeNumber"
import { getPrivateKey } from "./generateKeyPair"
import { getPublicKey } from "./generateKeyPair"
import encrypt from "./encrypt"
import decrypt from "./decrypt"
import createSha256Hash from "./hash"
import { promises } from "dns"
import { copyFileSync } from "fs"

interface publicKey {
    "publicKey": bigint,
    "n": bigint
}

interface privateKey {
    "privateKey": bigint,
    "n": bigint
}

export async function generateKeyPair(bitLength: number) : Promise<[ publicKey: publicKey, privateKey: privateKey ]> {
    if (bitLength < 1024) {
        if (bitLength <= 32) {
            throw new Error("bitLength must be at least 33 bits long. A length of 1024 bits is recommended.")
        }
        else {
            console.warn("It’s recommended that bitLength is at least 1024 bits each.")
        }
    }
    const p = getRendomPrimeNumber(bitLength)
    const q = getRendomPrimeNumber(bitLength)
    
    const n = p * q

    const privateKey = {
        "privateKey": getPrivateKey(p, q, bitLength),
        "n": n
    } 

    const publicKey = {
        "publicKey": getPublicKey(p,q,privateKey.privateKey),
        "n": n
    }

    const testMessage = "Hello World!"
    const encryptedMessage = await encryptMessage(testMessage, publicKey)
    const decryptedMessage = await decryptMessage(encryptedMessage, privateKey)
    if (decryptedMessage !== testMessage) {
        return await generateKeyPair(bitLength)
    }
    return [publicKey, privateKey]

}

export async function signMessage(message: string, privateKey: privateKey) {
    const hashedMessage = await createSha256Hash(message)
    const signedMessage = await encrypt(hashedMessage, privateKey.privateKey, privateKey.n)
    return signedMessage
}

export async function encryptMessage(message: string, publicKey: publicKey): Promise<bigint[][]> {
    return await encrypt(message, publicKey.publicKey, publicKey.n)
}

export async function verifyMessageSigniture(message: string, singedMessage: bigint[][], publicKey: publicKey): Promise<boolean> {
    const decryptMessageSignature = await decrypt(singedMessage, publicKey.publicKey, publicKey.n)
    const messageHash = await createSha256Hash(message)
    if (messageHash !== decryptMessageSignature) {
        return false
    }
    return true 
}

export async function decryptMessage(encryptedMessage: bigint[][], privateKey: privateKey): Promise<string> {
    return await decrypt(encryptedMessage, privateKey.privateKey, privateKey.n)
}