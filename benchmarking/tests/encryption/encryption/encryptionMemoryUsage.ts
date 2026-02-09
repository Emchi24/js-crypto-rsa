import { getText } from "../executeEncryptionAndDecryptionTests"
import memoryUsageTest from "../../memoryUsageTest"
import executeBenchTest from "../../executeBenchTest"

import { encryptMessage, generateKeyPair } from '../../../../dist/index.js'

// preperation function

async function preparingFunction(size: number, iteration: number) {
    const [privateKey, publicKey] = await generateKeyPair(size)
    const textSize = Math.round((publicKey.n - 2n).toString(2).length / 8)
    const text = getText(textSize)
    return [privateKey, publicKey, text]  
} 

async function encryptionMemoryAndCpuTest(numberOfIterations: number, testUntil: number) {
    const results = await memoryUsageTest("encryption", 32, testUntil, 8, numberOfIterations, "../../worker/encryptionWorker.js", async (size: number, iteration: number) => {
        return await preparingFunction(size, iteration)
    })

    return results
}

executeBenchTest(async () => {
    return await encryptionMemoryAndCpuTest(100, 40)
},"Performence speed test encryption", "performence_speed_test_encryption.json", "tinybench_performence_speed_test_encryption.json")