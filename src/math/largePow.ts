import isOdd from "./isOdd"

export default function largePow(basis: bigint, exponent: bigint): bigint {
    
    // handle base cases
    if (exponent == 0n) {
        return 1n
    }
    else if (exponent == 1n) {
        return basis
    }
    else if (basis == 1n) {
        return 1n
    }
    else {
        let result = 1n
        let x = exponent
        while (x > 0n) {

            if (isOdd(x)) {

                result *= basis
                x--
            }
            else {
                result *= basis * basis
                x -= 2n
            }
        }
        return result
    }
}