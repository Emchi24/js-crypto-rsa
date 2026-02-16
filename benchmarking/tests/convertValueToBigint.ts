
export function convertObjectBigIntStringsToBigInts(obj: object) {
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

export function convertValueToBigint(value: any) {
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
    try {
      return BigInt(value)
    } catch(error) {
      return value
    }
  }
}