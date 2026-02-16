import { TestingResult, TestingFunctionNames } from "./customTypes"
import measureMemoryAndCpuUsage from "./measureMemoryAndCpuUsage"
import { calculateMedian } from "./calculateMedian"

export default async function memoryAndCpuUsageTest(    
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

    for (let i = startingSize; i <= testUntilSize; i += enlargeBy) {
        let results: any[] = [] 
            let rs = []

        for (let k = 0; k < numOfIterations; k++) {

            console.log(`Memory and Cpu test at keysize: ${i}, iteration: ${k}`)
            let memoryAndCpuUsage, r
             if (preparingFunction) {
                const prep = await preparingFunction(i, k)
               let t = await measureMemoryAndCpuUsage(pathToWorker, [prep, i])
               memoryAndCpuUsage = t.performance
               r = t.executedWorkerResults


            }
            else {
                let t = await measureMemoryAndCpuUsage(pathToWorker, [i])
                memoryAndCpuUsage = t.performance
               r = t.executedWorkerResults

            }

            if (memoryAndCpuUsage == null) {
                continue
            }
            console.log(r)

            results.push(memoryAndCpuUsage)
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
