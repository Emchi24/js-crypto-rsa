import { UTF8Ranges, UTF8RangeKeys, UTF8RangeNames, UTF8followerRange, Range, TestingResult } from "../customTypes"

function getRandomIdxFromArr(arr: any[]) {
    return Math.floor(Math.random() *Math.random() * (arr.length - 1)) 
}

function generateRandomBytes(limit: number) {
    if (limit < 1) {
        return [null]
    }
    if (limit > 4) {
        limit = 4
    }
    const range = new Range(0, limit - 1)
    const idx: number  = getRandomIdxFromArr(range.arr) 
    const amountOfbytes: UTF8RangeKeys = UTF8RangeNames[idx]

    const rangeArr = UTF8Ranges[amountOfbytes].arr
    const decoder = new TextDecoder()
    let randomUTF8Bytes: number[] = []

    const randomNumber = rangeArr[getRandomIdxFromArr(rangeArr)]
    // get first byte
    randomUTF8Bytes.push(randomNumber)
    
    let secondByteRoul = UTF8followerRange

    if (randomNumber == 237) {
        secondByteRoul = new Range(128, 159)
    }

    if (randomNumber == 224) {
        secondByteRoul = new Range(160, 191)
    }

    if (randomNumber == 240) {
        secondByteRoul = new Range(144, 191)
    }

    if (randomNumber == 244) {
        secondByteRoul = new Range(128, 143)
    }

    // determent weahter followers are needed
    if (idx > 0) {
        for (let i = 1; i < idx + 1; i++) {
            if (i == 1) {
                const randomByteidx = getRandomIdxFromArr(secondByteRoul.arr)
                randomUTF8Bytes.push(secondByteRoul.arr[randomByteidx]) 
            }
            else {
                const randomByteidx = getRandomIdxFromArr(UTF8followerRange.arr)
               randomUTF8Bytes.push(UTF8followerRange.arr[randomByteidx])
            }
        }

    }    return [decoder.decode(new Uint8Array(randomUTF8Bytes)), idx + 1]
}

export function getText(textSize: number) {
    let text = ""
    let currentSize: number = 0
    while (currentSize < textSize) {
        const [character, size] = generateRandomBytes(textSize - currentSize)
        if (typeof size == "number") {
            currentSize += size
        }
        else continue
        text += character
    } 
    return text
}