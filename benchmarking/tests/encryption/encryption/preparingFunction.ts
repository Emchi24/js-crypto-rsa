import { getText } from "../executeEncryptionAndDecryptionTests"
import { publicKeyType, privateKeyType } from "../../../../dist/index.js"
import { readFile } from "fs/promises"

import { generateKeyPair } from '../../../../dist/index.js';
import { convertObjectBigIntStringsToBigIntObject } from "../../convertValueToBigintObject";

type result = {
    "publicKey": publicKeyType
    "privateKey": privateKeyType
    "keySize": bigint
}

type keygenResult = {
    keySize: number
    results: any[]
    executedFunctionResult: result[]
}

export default async function preparingFunction(size: number, iteration: number, filePath: string) {
    const file = await readFile(filePath, "utf8")
    const json = JSON.parse(file) as keygenResult[]
    const data = json.find((val) => val.keySize === size)
    
    let t = data?.executedFunctionResult[iteration]
    let keyPair
    let privateKey: any, publicKey: any

    if (typeof t == "object") {
        console.log(t)
        keyPair = convertObjectBigIntStringsToBigIntObject(t)
            publicKey = keyPair[0]
            privateKey = keyPair[1]
    }
    else {
        console.log(`there is no keypair for size: ${size}, iteration: ${iteration}`);
        // TODO generate new keypair
           [publicKey, privateKey] = await generateKeyPair(size)
    }

    const textSize = 16
    const text = getText(textSize)
    return [publicKey, privateKey, text]
    
} 