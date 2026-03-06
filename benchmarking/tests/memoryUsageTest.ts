import { TestingResult, TestingFunctionNames } from "./customTypes"
import measureMemoryUsage from "./measureMemoryUsage"
import { calculateMedian } from "./calculateMedian"
import calculateAvg from "./calculateAvg"
import verifyResults from "./encryption/decryption/verifyResults"
import { decryptionResults } from "./encryption/decryption/decryptionSpeedTest"

type Performance = {
    "cpu": number,
    "memory": number,
     "ctime": number,
     "elapsed": number,
     "timestamp": number,
     "pid": number,
     "ppid": number
    
}

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

    for (let i = startingSize; i <= testUntilSize; i += enlargeBy) {

        let results: any[] = [] 
        let rs: decryptionResults[] = []
        let mem: number[] = []

        for (let k = 0; k < numOfIterations; k++) {

            console.log(`Memory test at keysize: ${i}, iteration: ${k}`)
                        
            let monitor: Performance[] = []
            let r: decryptionResults

             if (preparingFunction) {
                const prep = await preparingFunction(i, k)
               let t = await measureMemoryUsage(pathToWorker, [prep, i])
               monitor = t.performance
               r = t.executedWorkerResults


            }
            else {
                let t = await measureMemoryUsage(pathToWorker, [i])
                monitor = t.performance
               r = t.executedWorkerResults

            }

            if (monitor == null) {
                continue
            }
            monitor.forEach((m) => {
                mem.push(m.memory)
            })
            results.push(monitor)
            if (name == "decryption") {
                if (!verifyResults(r)) {
                    throw Error(`decryptedData is no the same as original data: decrypted ${r.decryptedText} vs original ${r.originalText}`)
                }
            }
            rs.push(r)
        }

        result.push({
            "keySize": i,
            "results": results,
            "median": calculateMedian(mem),
            "avg": calculateAvg(mem),
            "executedFunctionResult": rs
        })
    }
    
    return result
}
