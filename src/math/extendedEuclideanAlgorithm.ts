

export default function extendedEuclideanAlgorithm(a: bigint, b: bigint) {
    let q: bigint[] = [],
        r: bigint[] = [], 
        x:bigint[] = [],  
        y: bigint[] = [], 
        aArr: bigint[] = [], 
        bArr: bigint[] = [] 

    // initialize values
    let i = 0
    aArr[0] = a 
    bArr[0] = b
    
    // q = a_i / b_i
    q[0] = aArr[i] / bArr[i]

    // r = a_i - b_i * q_i
    r[0] = aArr[i] - bArr[i] * q[i]


    while (r[i] != 0n) {
        i++

        // a_i = b_i-1 
        aArr[i] = bArr[i-1]

        // b_i = r_i-1
        bArr[i] = r[i-1]

        q[i] = aArr[i] / bArr[i]

        r[i] = aArr[i] - bArr[i] * q[i]
        
    } 

    // initialize x and y 
    x[i] = 0n
    y[i] = 1n
    const gcd = r[i-1]

    // with the extended euclidean Algorithm you can only calculate the multiplicative inverse for a mod b if a and b are relative prime
    if (gcd != 1n) {
        throw Error("the gcd of a and b must be 1 to calculate multiplicative inverse")
    }


    // y_
    for (let k = i-1; k >= 0; k--) {
        // x_k = y_k+1
        x[k] = y[k+1]

        // y_k = x_k+1 - q_k * y_k+1
        y[k] = x[k+1] - q[k] * y[k+1]

        // Bézout's identity must holf for every step 
        const check = gcd === (aArr[k] * x[k]) + (bArr[k] * y[k]) // gcd == 1
        if (!check) {
            throw Error("Mathematical Error in calculating multiplicative inverse: 1 != a * x + b * y")
        }
    }
    let result = x[0]

    // if result is < 0 we can ad the modulo to the result. e.g -2 % 11 = 9 and -2 + 11 = 9
    if (result < 0) {
        result = result + b
    }
    const multiplicativeInverseCheck = (a * result) % b === 1n
    if (multiplicativeInverseCheck) {
        return result
    }
    else {
        throw Error("Mathematical Error in calculating multiplicative inverse")
    }
}

