import { getText } from "../executeEncryptionAndDecryptionTests"
import performanceTestSpeed from "../../performanceTestSpeed"
import executeBenchTest from "../../executeBenchTest"

import { encryptMessage, generateKeyPair } from '../../../../dist/index.js';
const idx = require('../../../../dist/index.js')

// preperation function

async function preparingFunction(size: number, iteration: number) {
    const [privateKey, publicKey] = await generateKeyPair(size)
    const textSize = Math.round((publicKey.n - 2n).toString(2).length / 8)
    const text = getText(textSize)
    return [privateKey, publicKey, text]
    
} 

async function encryptionSpeedTest(numberOfIterations: number, testUntil: number) {
    const results = await performanceTestSpeed("encryption", 32, testUntil, 8, numberOfIterations, async (iteration: number, prep: any[]) => {
        
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
    }, async (size: number, iteration: number) => {
        return await preparingFunction(size, iteration)
    })

    return results
}

executeBenchTest(async () => {
    return await encryptionSpeedTest(100, 40)
},"Performence speed test encryption", "performence_speed_test_encryption.json", "tinybench_performence_speed_test_encryption.json")