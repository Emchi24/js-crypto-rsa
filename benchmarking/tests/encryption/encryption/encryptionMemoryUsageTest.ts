
import preparingFunction from "./preparingFunction"
import executeBenchTest from "../../executeBenchTest";
import memoryUsageTest from "../../memoryUsageTest";

const filePath = "./keygen_memory_test.json"

executeBenchTest(async () => {
        return await memoryUsageTest("encryption",
            32, // start at
            40, // test until
            8, // enlarge by
            100, // number of iterations per size
            "../../workers/encryptionWorker.ts",
            async (size: number, iteration: number) => {
                return await preparingFunction(size, iteration, filePath)
            })
        }, "encryption_memory_test.json", "encryption_memory_test.json.json", "tinybench_encryption_memory_test.json.json")