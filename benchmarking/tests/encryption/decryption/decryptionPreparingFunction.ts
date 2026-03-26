import { readFile } from "fs/promises"
import { encryptionResults } from "../../customTypes"
import { convertObjectBigIntStringsToBigIntObject } from "../../../../src/convertValueToBigintObject"

export default async function preparingFunction(size: number, iteration: number, decryptionResultPath: string) {
  const file = await readFile(decryptionResultPath, "utf8")
  const json = JSON.parse(file) as encryptionResults[]
  const data = json.find(e => e.keySize === size)
  if (!data) {
    throw Error(`there is no data for tests with an keySize of ${size} bits in ${decryptionResultPath}`)
  }
  //console.log(data.executedFunctionResult[iteration])
  const converted = convertObjectBigIntStringsToBigIntObject(data.executedFunctionResult[iteration])
  console.log(converted)

  return [converted.encryptedText, converted.publicKey, converted.privateKey, converted.originalText]
}