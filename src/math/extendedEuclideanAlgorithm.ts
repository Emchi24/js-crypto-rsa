

export default function extendedEuclideanAlgorithm(a: bigint, b: bigint) {
    let q: bigint[] = [],
        r: bigint[] = [],
        x:bigint[] = [], 
        y: bigint[] = [], 
        aArr: bigint[] = [], 
        bArr: bigint[] = []
    aArr[0] = a
    bArr[0] = b
     let i = 0
    q[0] = a / b
    r[0] = a - b * q[i]


    while (r[i] != 0n) {
        i++
        aArr[i] = bArr[i-1]
        bArr[i] = r[i-1]
        q[i] = aArr[i] / bArr[i]
        r[i] = aArr[i] - bArr[i] * q[i]
        
    } 
    x[i] = 0n
    y[i] = 1n
    const gcd = r[i-1]
    if (gcd != 1n) {
        throw Error("the gcd of a and b must be 1 to calculate multiplicative inverse")
    }

    for (let k = i-1; k >= 0; k--) {
        const xk = y[k+1]
        const yk = x[k+1] - q[k] * y[k+1]
        x[k] = xk
        y[k] = yk
        const check = gcd === (aArr[k] * x[k]) + (bArr[k] * y[k])
        if (!check) {
            throw Error("Mathematical Error in calculating multiplicative inverse: gdc != a * x + b * y")
        }
    }
    let result = x[0]
    if (result < 0) {
        result = result + b
    }
    const multiplicativeInverssCheck = (a * result) % b === 1n
    if (multiplicativeInverssCheck) {
        return result
    }
    else {
        throw Error("Mathematical Error in calculating multiplicative inverse")
    }
}

