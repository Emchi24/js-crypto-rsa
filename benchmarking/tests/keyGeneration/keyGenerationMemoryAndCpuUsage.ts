import memoryAndCpuUsageTest from "../memoryAndCpuUsageTest";
import executeBenchTest from "../executeBenchTest";

executeBenchTest(async () => {
    return await memoryAndCpuUsageTest("key", 1024, 4096, 512, 200, "../workers/keyGenerationWorker.ts")
}, "memory usage", "keygen_memory_an_cpu_test.json", "tinybench_keygen_memory_and_cpu_test.json")