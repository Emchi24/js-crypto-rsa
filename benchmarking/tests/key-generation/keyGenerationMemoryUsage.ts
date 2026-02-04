import measureMemoryUsage from "../measureMemoryUsage";
import { testingResult } from "../customTypes";
import { calculateMedian } from "../calculateMedian";
import executeBenchTest from "../executeBenchTest";

const idx = require('../../../dist/index.js')

async function keyGenerationMemoryUsage(testUntilKeySize: number, numOfIterations: number) {
     if (testUntilKeySize < 32) {
        throw Error("the key size must be at least 32")
    }

    let result: testingResult[] = []

    for (let i = 32; i < testUntilKeySize; i += 8) {
        let results: number[] = [] 

        for (let k = 0; k < numOfIterations; k++) {

            const memoryUsage = await measureMemoryUsage(async () => {
                const [publicKey, privateKey] = await idx.generateKeyPair(i)  
            })

            if (memoryUsage == null) {
                continue
            }

            results.push(memoryUsage)
        }

        result.push({
            "keySize": i,
             "results": results,
            "median": calculateMedian(results)
        })
    }
    
    return result
}

executeBenchTest(async () => {
    return await keyGenerationMemoryUsage(4096, 100)
}, "memory usage", "memory_usage_test.json", "tinybench_memory_usage_test.json")