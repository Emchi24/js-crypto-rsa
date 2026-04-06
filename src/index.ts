import getRendomPrimeNumber from "./math/rnd/getRendomPrimeNumber"
import { getPrivateKey } from "./generateKeyPair"
import { getPublicKey } from "./generateKeyPair"
import encrypt from "./encrypt"
import decrypt from "./decrypt"
import createSha256Hash from "./hash"
import stringToObject from "./convertStringToObject"
import objectToString from "./convertObjectToString"

function isPublicKey(obj: any) {
    if (typeof obj != "object") {
        throw TypeError("object is not of type public key")
    }
    if (!obj.publicKey || typeof obj.publicKey != "bigint" || !obj.n || typeof obj.n != "bigint") {
        throw TypeError("object is not of type public key")
    }
}
export interface publicKeyType {
    "publicKey": bigint,
    "n": bigint
}

export interface privateKeyType {
    "privateKey": bigint,
    "n": bigint
}

export async function generateKeyPair(keyLength: number) : Promise<[ publicKey: string, privateKey: string ]> {
    if (keyLength < 1024) {
        if (keyLength < 32) {
            throw new Error("KeyLength must be at least 32 bits long. A length of 1024 bits is recommended.")
        }
        else {
            console.log("It’s recommended that bitLength is at least 1024 bits each.")
        }
    }
    
    if (keyLength % 8 != 0) {
        throw Error("The key Length must be devisile by 8")
    }

    const primeSize = keyLength / 2
    const p = getRendomPrimeNumber(primeSize)
    const q = getRendomPrimeNumber(primeSize)
    
    const n = p * q

    const privateKey: privateKeyType = {
        "privateKey": getPrivateKey(p, q, keyLength),
        "n": n
    } 

    const publicKey: publicKeyType = {
        "publicKey": getPublicKey(p,q,privateKey.privateKey),
        "n": n
    }

    const testMessage = "Hello World!"
    const encryptedMessage = await encryptMessage(testMessage, objectToString(publicKey))
    const decryptedMessage = await decryptMessage(encryptedMessage, objectToString(privateKey))

    if (decryptedMessage !== testMessage) {
        return await generateKeyPair(keyLength)
    }
    return [objectToString(publicKey), objectToString(privateKey)]

}

export async function signMessage(message: string, privateKey: string) {
    const convertedPrivateKey = stringToObject(privateKey)
    const hashedMessage = await createSha256Hash(message)
    const signedMessage = await encrypt(hashedMessage, convertedPrivateKey.privateKey, convertedPrivateKey.n, convertedPrivateKey.n.toString(2).length - 2)
    return signedMessage
}

export async function encryptMessage(message: string, publicKey: string): Promise<string[][]> {
    const convertedPublicKey = stringToObject(publicKey)
    return await encrypt(message, convertedPublicKey.publicKey, convertedPublicKey.n, convertedPublicKey.n.toString(2).length - 2)
}

export async function verifyMessageSignature(message: string, singedMessage: string[][], publicKey: string): Promise<boolean> {
    const convertedPublicKey = stringToObject(publicKey)
    const decryptMessageSignature = await decrypt(singedMessage, convertedPublicKey.publicKey, convertedPublicKey.n)
    const messageHash = await createSha256Hash(message)
    if (messageHash !== decryptMessageSignature) {
        return false
    }
    return true 
}

export async function decryptMessage(encryptedMessage: string[][], privateKey: string): Promise<string> {
    const convertedPrivateKey = stringToObject(privateKey)
    return await decrypt(encryptedMessage, convertedPrivateKey.privateKey, convertedPrivateKey.n)
}