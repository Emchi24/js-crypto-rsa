
import isOdd from "./isOdd"

export default function jacobiSymbol(a: bigint, n: bigint): bigint {
    // base checks
    if (isOdd(n) == false || n < 1n) {
        throw new Error("n must be odd and positive")
    }

    if (a == 0n) {
        if (n == 1n) {
            return 1n
        }
        return 0n
    }
    else if (a == 1n) {
        return 1n
    }
    else if (n == 1n) {
        return 1n
    }
    let ar: bigint = a % n // Reduction of a

    if (ar < 0n) {

        const nModulo4 = n % 4n

        let xSymbol: bigint = 0n // xSymbol == (-1/n) symbol

        if (nModulo4 == 1n) {
            xSymbol = 1n
        }
        else if (nModulo4 == 3n) {
            xSymbol = -1n
        }
        else {
            throw new Error("Mathematical Error in calculating Jacobi Symbol")
        }
        return jacobiSymbol(ar * -1n, n) * xSymbol
    }
    let result = 1n
    const nModulo8 = n % 8n

    let ySymbol: bigint = 0n // ySymbol == (2/n) Symbol

    if (nModulo8 == 1n || nModulo8 == 7n) {
        ySymbol = 1n
    }
    else if (nModulo8 == 3n || nModulo8 == 5n) {
        ySymbol = -1n
    }
    else {
        throw new Error("Mathematical Error in calculating Jacobi Symbol")
    }
    while (isOdd(ar) == false) {
        result = result * ySymbol
        ar /= 2n
    }
    if (ar > 1) {
        // Reziprozitätsgesetz
        let reciprocityFactor = 1n

        const exponent = ((ar - 1n) / 2n) * ((n - 1n) / 2n)
        if (isOdd(exponent)) {
            reciprocityFactor = -1n
        }
        return result * reciprocityFactor * jacobiSymbol(n % ar, ar)
    }
    else if (ar == 1n) {
        return result
    }
    else {
        throw new Error("Mathematical Error in calculating Jacobi Symbol")
    }
}
