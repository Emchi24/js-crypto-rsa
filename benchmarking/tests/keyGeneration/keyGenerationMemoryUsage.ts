import memoryUsageTest from "../memoryUsageTest";
import executeBenchTest from "../executeBenchTest";

executeBenchTest(async () => {
    return await memoryUsageTest("key", 1024, 4098, 512, 200, "../workers/keyGenerationWorker.ts")
}, "memory usage", "keygen_memory_test.json", "tinybench_keygen_memory_test.json")