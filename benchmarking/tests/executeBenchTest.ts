import fs from "fs"
import {Bench} from "tinybench"

export default async function executeBenchTest(
    toExecute: Function, 
    benchmarkName: string, 
    outputFilePathTestResult: string, 
    outputFilePathTinyBench: string
) {
    const bench = new Bench({
    name: benchmarkName,
    iterations: 1,     
    warmupIterations: 0,  
    warmupTime: 0       
    })

    bench.add(benchmarkName, async () => {
        const testResults = await toExecute()
        if (fs.existsSync(outputFilePathTestResult)) {
            fs.unlinkSync(outputFilePathTestResult)
        }
        await fs.writeFile(
            outputFilePathTestResult,
            JSON.stringify(testResults, (key, value) =>
                typeof value === 'bigint' ? value.toString() : value
            ),
            'utf8', () => {}
            )
    })

    await bench.run()
    if (fs.existsSync(outputFilePathTinyBench)) {
        fs.unlinkSync(outputFilePathTinyBench)
    }
    await fs.writeFile(outputFilePathTinyBench, JSON.stringify(bench.table(), null, 1), 'utf8', () => {})
    console.table(bench.table())
}