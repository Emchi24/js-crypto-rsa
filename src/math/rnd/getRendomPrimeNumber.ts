import getRendomNumber from "./getRendomNumber";
import gcd from "../gcd";
import isOdd from "../isOdd";
import jacobiSymbol from "../jacobiSymbol";
import largeNumberModPow from "../largeNumberPow";

export default function getRendomPrimeNumber(bitLength: number) {
    while(true) {
        const b = getRendomNumber(bitLength, true);
        if (!isOdd(b)) {
            continue
        }
        const x = (b-1n) / 2n
        for (let i = 1; i <= 100; i++) {
            const a = getRendomNumber(bitLength - 1, false)
            let jacobi = jacobiSymbol(a, b);  
            if (jacobi == -1n) {
                jacobi = b - 1n // modular arithmetic way to def jacobiSybol = -1
            }
            const modPowResult = largeNumberModPow(a, x, b)


            const PrimCheck = gcd(a, b) === 1n && jacobi === modPowResult
            if(PrimCheck) {
                if (i == 100) {
                    return b
                }
                else {
                    continue
                }
            }
            else {
                break
            } 
        }
    } 
}