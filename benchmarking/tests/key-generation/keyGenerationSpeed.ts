import { calculateMedian } from "../calculateMedian"
import { testingResult } from "../customTypes"
import executeBenchTest from "../executeBenchTest"
const idx = require('../../../dist/index.js')

async function testPerformanceSpeed(testUntilKeySize: number, numOfIterations: number) {

    if (testUntilKeySize < 32) {
        throw Error("the key size must be at least 32")
    }

    let result: testingResult[] = [] 

    for (let i = 32; i < testUntilKeySize; i+=8) {

        let durationSum: number = 0
        let results: number[] = []

        for (let k = 0; k < numOfIterations; k++) {

            let startTimeStamp = performance.now() // timestamp in milsec

            const [publicKey, privateKey] = await idx.generateKeyPair(i)

            let endTimeStamp = performance.now()

            durationSum += endTimeStamp - startTimeStamp
            results.push(endTimeStamp - startTimeStamp)
        }
        result.push({
            "keySize": i,
            "results": results,
            "median": calculateMedian(results)
        })
    }
    return result
}

executeBenchTest((async () => {
    return await testPerformanceSpeed(4096, 100)
}), "speed Test", "speed_test_results.json", "tinybench_speed_test_results.json")
