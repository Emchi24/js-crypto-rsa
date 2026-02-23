import { readFile } from "fs/promises"
import { encryptionResults, encryptionFunctionResult } from "../../customTypes"
import { convertObjectBigIntStringsToBigInts } from "../../convertValueToBigint"
import { decryptMessage, publicKeyType, privateKeyType } from "../../../../dist/index.js"
import executeBenchTest from "../../executeBenchTest"
import performanceTestSpeed from "../../performanceTestSpeed"
import { serialize } from "v8"

export type decryptionResults = {
  "publicKey": publicKeyType
  "privateKey": privateKeyType
  "encryptedText": string
  "decryptedText": string
  "originalText": string
}

async function preparingFunction(size: number, iteration: number, encryptionResultPath: string) {
  const file = await readFile(encryptionResultPath, "utf8")
  const json = JSON.parse(file) as encryptionResults[]
  const data = json.find(e => e.keySize === size)
  if (!data) {
    throw Error(`there is no data for tests with an keySize of ${size} bits in ${encryptionResultPath}`)
  }
  const converted = convertObjectBigIntStringsToBigInts(data.executedFunctionResult[iteration])
  console.log(converted)
  return [converted.encryptedText, converted.publicKey, converted.privateKey, converted.originalText]
}

async function executeDecryptionSpeedTest(size: number, prep: any[]) : Promise<decryptionResults> {
  const encryptedText = prep[0]
  const publicKey = prep[1]
  const privateKey = prep[2]
  const originalText = prep[3]

  const decryptedText = await decryptMessage(encryptedText, privateKey)
  return {
    "publicKey": publicKey,
    "privateKey": privateKey, 
    "encryptedText": encryptedText, 
    "decryptedText": decryptedText,
    "originalText": originalText
  }
  // functionallity test
}

executeBenchTest(async () => {
  return await performanceTestSpeed(
    "decryption",
    32, 
    40, 
    8,
    100,
    async (size: number, prep: any[]) => {
      return await executeDecryptionSpeedTest(size, prep)
    },
    async (size: number, iteration: number) => {
      return await preparingFunction(size, iteration, "./performence_speed_test_encryption.json")
    }
  )
}, "decryption_speed_test", "decryption_speed_test.json", "tinybench_decryption_speed_test.json")
