
import { decryptMessage, publicKeyType, privateKeyType } from "../../../../dist/index.js"
import executeBenchTest from "../../executeBenchTest"
import performanceTestSpeed from "../../performanceTestSpeed"

import preparingFunction from "./decryptionPreparingFunction"

export type decryptionResults = {
  "publicKey": publicKeyType
  "privateKey": privateKeyType
  "encryptedText": string
  "decryptedText": string
  "originalText": string
}

async function executeDecryptionSpeedTest(size: number, prep: any[]) : Promise<decryptionResults> {
  const encryptedText = prep[0]
  const publicKey = prep[1]
  const privateKey = prep[2]
  const originalText = prep[3]
  console.log(`original text: ${originalText}`)
  const decryptedText = await decryptMessage(encryptedText, privateKey)
  console.log(`decrypted text: ${decryptedText}`)
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
    1024, 
    4096, 
    512,
    200,
    async (size: number, prep: any[]) => {
      return await executeDecryptionSpeedTest(size, prep)
    },
    async (size: number, iteration: number) => {
      return await preparingFunction(size, iteration, "./encryption_speed_test.json")
    }
  )
}, "decryption_speed_test", "decryption_speed_test.json", "tinybench_decryption_speed_test.json")
