import getRendomNumber from "./math/rnd/getRendomNumber";
import gcd from "./math/gcd";
import extendedEuclideanAlgorithm from "./math/extendedEuclideanAlgorithm";

// Find the private key in such a way that it satisfies the conditions defined in the RSA paper 
export function getPrivateKey(p: bigint, q: bigint, bitLength: number) {
    const x = (p-1n) * (q-1n)
    while (true) {
        const d = getRendomNumber((bitLength), false)
        const relativePrimeCheck = gcd(d, x) === 1n
        if (relativePrimeCheck) {
            return d
        }
    }
}

// Find the public key in such a way that it satisfies the conditions defined in the RSA paper 
export function getPublicKey(p: bigint,q: bigint, d: bigint) {
    const x = (p-1n) * (q-1n)
    const e = extendedEuclideanAlgorithm(d, x) // to calculate multiplicative invere
    return e
}