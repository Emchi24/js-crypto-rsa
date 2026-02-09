import { TestingResult, TestingFunctionNames } from "./customTypes"
import measureMemoryAndCpuUsage from "./measureMemoryAndCpuUsage"
import { calculateMedian } from "./calculateMedian"

export default async function memoryUsageTest(    
    name: TestingFunctionNames, 
    startingSize: number, 
    testUntilSize: number, 
    enlargeBy: number, 
    numOfIterations: number, 
    pathToWorker: string,
    preparingFunction?: Function
    ) {
     if (testUntilSize < 32) {
        throw Error("the key size must be at least 32")
    }

    let result: any[] = []

    for (let i = startingSize; i < testUntilSize; i += enlargeBy) {
        let results: any[] = [] 
            let rs = []

        for (let k = 0; k < numOfIterations; k++) {
            let memoryUsage
            let r
             if (preparingFunction) {
                const prep = await preparingFunction(i, k)
                memoryUsage = await measureMemoryAndCpuUsage(pathToWorker, prep)

            }
            else {
                memoryUsage = await measureMemoryAndCpuUsage(pathToWorker, [i])

            }

            if (memoryUsage == null) {
                continue
            }

            results.push(memoryUsage)
            rs.push(r)
        }

        result.push({
            "keySize": i,
             "results": results,
            "executedFunctionResult": rs
        })
    }
    
    return result
}
