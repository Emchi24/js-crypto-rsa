import { TestingResult, TestingFunctionNames } from "./customTypes"
import { calculateMedian } from "./calculateMedian"

export default async function performanceTestSpeed(
    name: TestingFunctionNames, 
    startingSize: number, 
    testUntilSize: number, 
    enlargeBy: number, 
    numOfIterations: number, 
    toExecute: Function,
    preparingFunction?: Function) {

    if (name == "key") {
        if (testUntilSize < 32) {
            throw Error("the key size must be at least 32")
        }
    }
    let result: TestingResult[] = [] 

    for (let i = startingSize; i < testUntilSize; i+=enlargeBy) {

        let durationSum: number = 0
        let results: number[] = []
        let rs = []

        for (let k = 0; k < numOfIterations; k++) {
            let startTimeStamp
            let endTimeStamp
            let r
            if (preparingFunction) {
                const prep = await preparingFunction(i, k)
                startTimeStamp = performance.now() // timestamp in milsec

                r = await toExecute(i, prep)

                endTimeStamp = performance.now()
            }
            else {
                startTimeStamp = performance.now() // timestamp in milsec

                r = await toExecute(i)

                endTimeStamp = performance.now()
            }

            durationSum += endTimeStamp - startTimeStamp
            results.push(endTimeStamp - startTimeStamp)
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
