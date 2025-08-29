export default function isOdd(x: bigint) {
    const modulo2 = x % 2n
    if (modulo2 == 0n) {
        return false
    }
    return true
}
