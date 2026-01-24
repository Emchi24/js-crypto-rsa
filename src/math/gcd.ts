export default function gcd(a: bigint, b: bigint) {    // faster implementation of the euclidean algorithm to calculate only the gcd (greatest common devisor) 
    if (b == 0n) {
        return a
    }
    return gcd(b, a % b)
}
