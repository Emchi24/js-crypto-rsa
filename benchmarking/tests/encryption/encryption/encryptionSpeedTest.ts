import performanceTestSpeed from "../../performanceTestSpeed"
import preparingFunction from "./preparingFunction"
import { encryptMessage } from '../../../../dist/index.js';
import executeBenchTest from "../../executeBenchTest";

const filePath = "./keygen_memory_an_cpu_test.json"

executeBenchTest(async () => {
        return await performanceTestSpeed("encryption",
            512, // start at
            512, // test until
            512, // enlarge by
            100, // number of iterations per size
        async (size: number, prep: any[]) => {
            console.log(prep)
            const publicKey = prep[0]
            const privateKey =  prep[1]
            const text = prep[2]
            const encryptedText = await encryptMessage(text, publicKey)
            return {
                "privateKey": privateKey,
                "publicKey": publicKey,
                "encryptedText": encryptedText,
                "originalText": text
            }
        }, async (size: number, iteration: number) => {
            return await preparingFunction(size, iteration, filePath)
        })
}, "encryption_speed_test", "encryption_speed_test.json", "tinybench_encryption_speed_test.json")