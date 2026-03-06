
export function convertObjectBigIntToBigIntStrings(obj: object) {
  let updatedObject: Record<string, any> = {}
  Object.entries(obj).forEach(([key, value]) => {
    if (key == "originalText") {
      updatedObject[key] = value
      return 
    }
    const updatedValue = convertBigintToString(value)
    updatedObject[key] = updatedValue
  })
  return updatedObject
}

export function convertBigintToString(value: any) {
  if (Array.isArray(value)) {
      let updatedArray: any[] = []
      value.forEach(entry => {
        if (Array.isArray(entry)) {
          updatedArray.push(convertBigintToString(entry))
        }
        if (typeof entry == "bigint") {
          updatedArray.push(String(entry))
        }
      })
      return updatedArray
  }
  if (typeof value == "object") {
    return convertObjectBigIntToBigIntStrings(value)
  }
}