
import preparingFunction from "./preparingFunction"
import executeBenchTest from "../../executeBenchTest";
import memoryUsageTest from "../../memoryUsageTest";

const filePath = "./keygen_speed_test_results.json"

executeBenchTest(async () => {
        return await memoryUsageTest("encryption",
            1024, // start at
            4096, // test until
            512, // enlarge by
            200, // number of iterations per size
            "../../workers/encryptionWorker.ts",
            async (size: number, iteration: number) => {
                return await preparingFunction(size, iteration, filePath)
            })
        }, "encryption_memory_test.json", "encryption_memory_test.json", "tinybench_encryption_memory_test.json")