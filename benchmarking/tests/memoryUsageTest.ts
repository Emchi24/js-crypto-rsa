import { TestingResult, TestingFunctionNames } from "./customTypes"
import measureMemoryUsage from "./measureMemoryUsage"
import { calculateMedian } from "./calculateMedian"

export default async function memoryUsageTest(    
    name: TestingFunctionNames, 
    startingSize: number, 
    testUntilSize: number, 
    enlargeBy: number, 
    numOfIterations: number, 
    toExecute: Function,
    preparingFunction?: Function
    ) {
     if (testUntilSize < 32) {
        throw Error("the key size must be at least 32")
    }

    let result: TestingResult[] = []

    for (let i = startingSize; i < testUntilSize; i += enlargeBy) {
        let results: number[] = [] 
            let rs = []

        for (let k = 0; k < numOfIterations; k++) {
            let memoryUsage
            let r
             if (preparingFunction) {
                const prep = await preparingFunction(i)
                memoryUsage = await measureMemoryUsage(async () => {
                    r = await toExecute(i, prep)
                })

            }
            else {
                memoryUsage = await measureMemoryUsage(async () => {
                    r = await toExecute(i)
                })

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
            "median": calculateMedian(results),
            "executedFunctionResult": rs
        })
    }
    
    return result
}
