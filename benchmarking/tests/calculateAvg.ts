export default function calculateAvg(arr: number[]) {
    const len = arr.length
    let sum = 0
    arr.forEach(num => {
        sum += num
    })
    return sum / len
}