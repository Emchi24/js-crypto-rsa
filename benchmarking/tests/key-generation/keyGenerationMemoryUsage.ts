import memoryUsageTest from "../memoryUsageTest";
import executeBenchTest from "../executeBenchTest";

const idx = require('../../../dist/index.js')

executeBenchTest(async () => {
    return await memoryUsageTest("key", 32, 4096, 8, 100, async (i: number) => {
        const [publicKey, privateKey] = await idx.generateKeyPair(i)  
    })
}, "memory usage", "memory_usage_test.json", "tinybench_memory_usage_test.json")