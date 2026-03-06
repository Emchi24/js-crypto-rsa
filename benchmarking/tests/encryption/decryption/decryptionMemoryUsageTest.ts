
import preparingFunction from "./decryptionPreparingFunction"
import executeBenchTest from "../../executeBenchTest";
import memoryUsageTest from "../../memoryUsageTest";

const filePath = "./encryption_memory_test.json"

executeBenchTest(async () => {
        return await memoryUsageTest("decryption",
            1024, // start at
            4096, // test until
            512, // enlarge by
            200, // number of iterations per size
            "../../workers/decryptionWorker.ts",
            async (size: number, iteration: number) => {
                return await preparingFunction(size, iteration, filePath)
            })
        }, "decryption_memory_test", "decryption_memory_test.json", "tinybench_decryption_memory_test.json")
