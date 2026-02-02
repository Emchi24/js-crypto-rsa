// fast implementation of the euclidean algorithm to calculate the gcd (greatest common devisor)

export default function gcd(a: bigint, b: bigint) {   
    if (b == 0n) {
        return a
    }
    return gcd(b, a % b)
}
