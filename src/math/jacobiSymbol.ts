
import isOdd from "./isOdd"

/*
 The Jacobi symbol (a/n) indicates the following:
 
 -1: a is definitely NOT a quadratic residue modulo n 
     (there is no x such that x^2 ≡ a (mod n)).

  0: a and n are not relative prime (gcd(a, n) > 1).

  1: a MIGHT be a quadratic residue modulo n. We must distinguish cases based on n:
     1. If n is prime: a is definitely a quadratic residue.
     2. If n is composite: a may or may not be a quadratic residue.

*/

export default function jacobiSymbol(a: bigint, n: bigint): bigint {

    // validation checks
    if (isOdd(n) == false || n < 1n) {
        throw new Error("n must be odd and positive")
    }

    // base checks
    if (a == 0n) {
        if (n == 1n) {
            return 1n
        }
        return 0n
    }
    if (a == 1n) {
        return 1n
    }
    if (n == 1n) {
        return 1n
    }
    let ar: bigint = a % n // Reduction of a 

    // Handle negative numerator using the First Complementary Law
    // Property: (-a/n) = (-1/n) * (a/n)
    if (ar < 0n) {

        const nModulo4 = n % 4n

        let xSymbol: bigint = 0n // This will store the value of (-1/n)

        // Calculate (-1/n):
        // If n ≡ 1 (mod 4), then (-1/n) = 1
        if (nModulo4 == 1n) {
            xSymbol = 1n
        }

        // If n ≡ 3 (mod 4), then (-1/n) = -1
        else if (nModulo4 == 3n) {
            xSymbol = -1n
        }
        else {
            // The Jacobi symbol is only defined for odd integers n.
            throw new Error("Mathematical Error: n must be odd to calculate (-1/n)")
        }
        
        // Recurse with the positive version of a, multiplied by the sign calculated above
        // e.g (-7/n) = (7/n) * (-1/n)
        return jacobiSymbol(ar * -1n, n) * xSymbol
    }

    // Initialize result
    let result = 1n


    // We need to calculate (2/n). The value depends on n mod 8.
    const nModulo8 = n % 8n

    let ySymbol: bigint = 0n // This represents (2/n)

    // Calculate (2/n):
    if (nModulo8 == 1n || nModulo8 == 7n) {
        ySymbol = 1n
    }

    else if (nModulo8 == 3n || nModulo8 == 5n) {
        ySymbol = -1n
    }
    else {
        // n is even 
        throw new Error("Mathematical Error: Modulus n must be odd")
    }

    // We loop to divide 'ar' by 2 until it is odd, updating the result 
    // Property: (2*a / n) = (2/n) * (a/n)
    while (isOdd(ar) == false) {
        result = result * ySymbol
        ar /= 2n
    }

    // Apply the Law of Quadratic Reciprocity
    if (ar > 1) {
        // (a/n) = (n/a) * (-1)^((a-1)/2 * (n-1)/2)
        
        let reciprocityFactor = 1n

        // Calculate the exponent: ((ar - 1) / 2) * ((n - 1) / 2)
        const exponent = ((ar - 1n) / 2n) * ((n - 1n) / 2n)
        
        // If the exponent is odd, the sign flips (multiplies by -1)
        if (isOdd(exponent)) {
            reciprocityFactor = -1n
        }
        
        // Recursive step:
        // 1. Swap arguments: (a/n) becomes (n/a) due to reciprocity
        // 2. Reduce: (n/a) is equivalent to (n % a / a)
        return result * reciprocityFactor * jacobiSymbol(n % ar, ar)
    }

    else if (ar == 1n) {  
        return result
    }
    else {
        throw new Error("Mathematical Error in calculating Jacobi Symbol")
    }
}
