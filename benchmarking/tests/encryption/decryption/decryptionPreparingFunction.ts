import { readFile } from "fs/promises"
import { encryptionResults } from "../../customTypes"
import { convertObjectBigIntStringsToBigInts } from "../../convertValueToBigint"

export default async function preparingFunction(size: number, iteration: number, decryptionResultPath: string) {
  const file = await readFile(decryptionResultPath, "utf8")
  const json = JSON.parse(file) as encryptionResults[]
  const data = json.find(e => e.keySize === size)
  if (!data) {
    throw Error(`there is no data for tests with an keySize of ${size} bits in ${decryptionResultPath}`)
  }
  const converted = convertObjectBigIntStringsToBigInts(data.executedFunctionResult[iteration])

  return [converted.encryptedText, converted.publicKey, converted.privateKey, converted.originalText]
}