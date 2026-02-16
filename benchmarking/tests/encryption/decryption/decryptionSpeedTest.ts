import { readFile } from "fs/promises"
import { encryptionResults, encryptionFunctionResult } from "../../customTypes"
import { convertObjectBigIntStringsToBigInts } from "../../convertValueToBigint"

const encryptionResultPath = "./performence_speed_test_encryption.json"


async function preparingFunction(size: number, iteration: number) {
  const file = await readFile(encryptionResultPath, "utf8")
  const json = JSON.parse(file) as encryptionResults[]
  const data = json.find(e => e.keySize === size)
  if (!data) {
    throw Error(`there is no data for tests with an keySize of ${size} bits in ${encryptionResultPath}`)
  }
  const converted = convertObjectBigIntStringsToBigInts(data.executedFunctionResult[iteration])
  console.log(converted)
  return converted
}

async function executeDecryptionSpeedTest(size: number, prep: encryptionFunctionResult) {
  
}

preparingFunction(32, 1)