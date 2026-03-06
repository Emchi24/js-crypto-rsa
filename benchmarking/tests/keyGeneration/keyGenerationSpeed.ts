import performanceTestSpeed from "../performanceTestSpeed"
import executeBenchTest from "../executeBenchTest"
import { generateKeyPair } from "../../../dist/index.js"

executeBenchTest((async () => {
    return await performanceTestSpeed("key", 1024, 4096, 512, 200, async (i: number) => {
         const [publicKey, privateKey] = await generateKeyPair(i)
         return [publicKey, privateKey]
    })
}), "speed Test", "keygen_speed_test_results.json", "tinybench_keygen_speed_test_results.json")
