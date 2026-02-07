import { TestingResult } from "./customTypes"
import measureMemoryUsage from "./measureMemoryUsage"
import { calculateMedian } from "./calculateMedian"

export default async function memoryUsageTest(testUntilKeySize: number, numOfIterations: number, toExecute: Function) {
     if (testUntilKeySize < 32) {
        throw Error("the key size must be at least 32")
    }

    let result: TestingResult[] = []

    for (let i = 32; i < testUntilKeySize; i += 8) {
        let results: number[] = [] 
            let rs = []

        for (let k = 0; k < numOfIterations; k++) {

            let r
            const memoryUsage = await measureMemoryUsage(async () => {
                r = await toExecute(i)
            })

            if (memoryUsage == null) {
                continue
            }

            results.push(memoryUsage)
            rs.push(r)
        }

        result.push({
            "keySize": i,
             "results": results,
            "median": calculateMedian(results),
            "executedFunctionResult": rs
        })
    }
    
    return result
}
