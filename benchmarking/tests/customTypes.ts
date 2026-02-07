export type TestingResult = {
    "keySize": number
    "results": number[]
    "median": number
    "executedFunctionResult": any[]
}

export class Range {
    start: number
    end: number
    arr: number[]

    constructor(start: number, end: number) {
        if (start > end) {
            throw Error("start musst be less than end")
        }
        this.start = start
        this.end = end
        this.arr = this.array()
    }

    public array() {
        const rangeArray: number[] = []
        for (let i = this.start; i <= this.end; i++) {
            rangeArray.push(i)
        } 
        return rangeArray
    }
}

type ranges = {
    oneByte: Range,
    twoBytes: Range,
    threeBytes: Range,
    fourBytes: Range
}
export type UTF8RangeKeys = keyof ranges

export const UTF8Ranges: ranges = {
    oneByte: new Range(0, 127),
    twoBytes: new Range(194, 223),
    threeBytes: new Range(224, 239),
    fourBytes: new Range(240, 244)
}
export const UTF8followerRange: Range = new Range(128, 191)

export const UTF8RangeNames = Object.keys(UTF8Ranges) as Array<keyof typeof UTF8Ranges>;

export type TestingFunctionNames = "key" | "encryption" | "decryption"