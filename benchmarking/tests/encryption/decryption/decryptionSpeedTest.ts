import { readFile } from "fs/promises"
import { encryptionResults, encryptionFunctionResult } from "../../customTypes"
import { decryptMessage } from "../../../../dist/index.js"

const encryptionResultPath = "./performence_speed_test_encryption.json"

function convertObjectBigIntStringsToBigInts(obj: object) {
  let updatedObject: Record<string, any> = {}
  Object.entries(obj).forEach(([key, value]) => {
    if (key == "originalText") {
      updatedObject[key] = value
      return 
    }
    const updatedValue = convertValueToBigint(value)
    updatedObject[key] = updatedValue
  })
  return updatedObject
}

function convertValueToBigint(value: any) {
  if (Array.isArray(value)) {
      let updatedArray: any[] = []
      value.forEach(entry => {
        if (Array.isArray(entry)) {
          updatedArray.push(convertValueToBigint(entry))
        }
        if (typeof entry == "string") {
          updatedArray.push(BigInt(entry))
        }
      })
      return updatedArray
  }
  if (typeof value == "object") {
    return convertObjectBigIntStringsToBigInts(value)
  }

  if (typeof value == "string" || typeof value == "number") {
    return BigInt(value)
  }
}

async function preparingFunction(size: number, iteration: number) {
  const file = await readFile(encryptionResultPath, "utf8")
  const json = JSON.parse(file) as encryptionResults[]
  const data = json.find(e => e.keySize === size)
  if (!data) {
    throw Error(`there is no data for tests with an keySize of ${size} bits in ${encryptionResultPath}`)
  }

  console.log(data.executedFunctionResult[iteration])
  const converted = convertObjectBigIntStringsToBigInts(data.executedFunctionResult[iteration])
  console.log(converted)
  return 
}

async function executeDecryptionSpeedTest(size: number, prep: encryptionFunctionResult) {

}

preparingFunction(32, 1)