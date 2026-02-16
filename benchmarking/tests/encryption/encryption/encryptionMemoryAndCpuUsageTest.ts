
import preparingFunction from "./preparingFunction"
import executeBenchTest from "../../executeBenchTest";
import memoryAndCpuUsageTest from "../../memoryAndCpuUsageTest";

const filePath = "./keygen_memory_an_cpu_test.json"

executeBenchTest(async () => {
        return await memoryAndCpuUsageTest("encryption",
            32, // start at
            40, // test until
            8, // enlarge by
            100, // number of iterations per size
            "../../workers/encryptionWorker.ts",
            async (size: number, iteration: number) => {
                return await preparingFunction(size, iteration, filePath)
            })
        }, "encryption_memory_and_cpu_test.json", "encryption_memory_and_cpu_test.json.json", "tinybench_encryption_memory_and_cpu_test.json.json")