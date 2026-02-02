import getRendomNumber from "./getRendomNumber";
import gcd from "../gcd";
import isOdd from "../isOdd";
import jacobiSymbol from "../jacobiSymbol";
import largeNumberModPow from "../largeNumberPow";

export default function getRendomPrimeNumber(bitLength: number) {
    while(true) {

        // generate random candidate for prime number
        const candidate = getRendomNumber(bitLength, true);

        if (!isOdd(candidate)) {
            continue
        }
        
        // prepare exponent of a (candidate-1) / n for solovay strassen test
        const x = (candidate-1n) / 2n

        // repeat the test 100 times
        for (let i = 1; i <= 100; i++) {
            
            // generate random number a 
            const a = getRendomNumber(bitLength - 1, false)

            // calculate the jacobi symbol 
            let jacobi = jacobiSymbol(a, candidate) 
            
            if (jacobi == -1n) {
                jacobi = candidate - 1n // modular arithmetic way to def jacobiSymbol = -1
            }
            const modPowResult = largeNumberModPow(a, x, candidate)

            // for a prime number, the following condition should allways be true
            const PrimCheck = gcd(a, candidate) === 1n && jacobi === modPowResult

            if(PrimCheck) {
                if (i == 100) {

                    // passed the test
                    return candidate
                }
                else {

                    // test is not compleated
                    continue
                }
            }
            else {
                
                // faild test
                break
            } 
        }
    } 
}