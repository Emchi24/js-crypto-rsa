import memoryUsageTest from "../memoryUsageTest";
import executeBenchTest from "../executeBenchTest";

const idx = require('../../../dist/index.js')

executeBenchTest(async () => {
    return await memoryUsageTest("key", 32, 40, 8, 100, "../workers/keyGenerationWorker.ts")
}, "memory usage", "memory_usage_test.json", "tinybench_memory_usage_test.json")