import performanceTestSpeed from "../performanceTestSpeed"
import executeBenchTest from "../executeBenchTest"

const idx = require('../../../dist/src/index.js')

executeBenchTest((async () => {
    return await performanceTestSpeed("key", 1024, 4096, 512, 200, async (i: number) => {
         const [publicKey, privateKey] = await idx.generateKeyPair(i)
         return [publicKey, privateKey]
    })
}), "speed Test", "keygen_speed_test_results.json", "tinybench_keygen_speed_test_results.json")
