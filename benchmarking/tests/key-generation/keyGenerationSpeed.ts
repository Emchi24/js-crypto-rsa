import performanceTestSpeed from "../performanceTestSpeed"
import executeBenchTest from "../executeBenchTest"

const idx = require('../../../dist/index.js')

executeBenchTest((async () => {
    return await performanceTestSpeed("key", 32, 40, 8, 100, async (i: number) => {
        const [publicKey, privateKey] = await idx.generateKeyPair(i)
    })
}), "speed Test", "speed_test_results.json", "tinybench_speed_test_results.json")
