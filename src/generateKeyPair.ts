import getRendomPrimeNumber from "./math/rnd/getRendomPrimeNumber";
import getRendomNumber from "./math/rnd/getRendomNumber";
import gcd from "./math/gcd";
import largeNumberModPow from "./math/largeNumberPow";
import extendedEuclideanAlgorythm from "./math/extendedEuclideanAlgorythm";


export function getPrivateKey(p: bigint, q: bigint, bitLength: number) {
    const x = (p-1n) * (q-1n)
    while (true) {
        const d = getRendomNumber((bitLength * 2), false)
        const relativePrimeCheck = gcd(d, x) === 1n
        if (relativePrimeCheck) {
            return d
        }
    }
}
export function getPublicKey(p: bigint,q: bigint, d: bigint) {
    const x = (p-1n) * (q-1n)
    const e = extendedEuclideanAlgorythm(d, x)
    return e
}