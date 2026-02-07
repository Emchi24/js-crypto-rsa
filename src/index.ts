import getRendomPrimeNumber from "./math/rnd/getRendomPrimeNumber"
import { getPrivateKey } from "./generateKeyPair"
import { getPublicKey } from "./generateKeyPair"
import encrypt from "./encrypt"
import decrypt from "./decrypt"
import createSha256Hash from "./hash"

export interface publicKeyType {
    "publicKey": bigint,
    "n": bigint
}

export interface privateKeyType {
    "privateKey": bigint,
    "n": bigint
}

export async function generateKeyPair(keyLength: number) : Promise<[ publicKey: publicKeyType, privateKey: privateKeyType ]> {
    if (keyLength < 1024) {
        if (keyLength < 32) {
            throw new Error("keyLength must be at least 32 bits long. A length of 1024 bits is recommended.")
        }
        else {
            console.log("It’s recommended that bitLength is at least 1024 bits each.")
        }
    }
    const p = getRendomPrimeNumber(keyLength)
    const q = getRendomPrimeNumber(keyLength)
    
    const n = p * q

    const privateKey = {
        "privateKey": getPrivateKey(p, q, keyLength),
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
        return await generateKeyPair(keyLength)
    }
    return [publicKey, privateKey]

}

export async function signMessage(message: string, privateKey: privateKeyType) {
    const hashedMessage = await createSha256Hash(message)
    const signedMessage = await encrypt(hashedMessage, privateKey.privateKey, privateKey.n, privateKey.n.toString(2).length - 2)
    return signedMessage
}

export async function encryptMessage(message: string, publicKey: publicKeyType): Promise<bigint[][]> {
    return await encrypt(message, publicKey.publicKey, publicKey.n, publicKey.n.toString(2).length - 2)
}

export async function verifyMessageSignature(message: string, singedMessage: bigint[][], publicKey: publicKeyType): Promise<boolean> {
    const decryptMessageSignature = await decrypt(singedMessage, publicKey.publicKey, publicKey.n)
    const messageHash = await createSha256Hash(message)
    if (messageHash !== decryptMessageSignature) {
        return false
    }
    return true 
}

export async function decryptMessage(encryptedMessage: bigint[][], privateKey: privateKeyType): Promise<string> {
    return await decrypt(encryptedMessage, privateKey.privateKey, privateKey.n)
}