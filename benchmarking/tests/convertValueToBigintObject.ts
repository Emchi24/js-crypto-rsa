
function isIntegerString(str: any) {
  if (typeof str != "string") {
    return false
  }
  return /^-?\d+$/.test(str)
}

export function convertObjectBigIntStringsToBigIntObject(obj: object) {
  let updatedObject: Record<string, any> = {}
  Object.entries(obj).forEach(([key, value]) => {
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
        if (isIntegerString(entry)) {
          updatedArray.push(BigInt(entry))
        }
      })
      return updatedArray
  }

  if (typeof value == "object") {
    return convertObjectBigIntStringsToBigIntObject(value)
  }
  if (isIntegerString(value)) {
    try {
      console.log(value)
      return BigInt(value)
    } catch(error) {
      return value
    }
  }
  return value
}