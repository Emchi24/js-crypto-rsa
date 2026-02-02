import numberToBinary from "./numberToBinary"

// this is the encryption and decryption algorithm defined in the RSA paper
export default function largeNumberModPow(m: bigint, e: bigint, n: bigint): bigint {

    const nInBinary: string = e.toString(2)
    const nlength = nInBinary.length

    let result = 1n

    for (let i = 0; i < nlength; i++) {

        const bit = nInBinary[i]
        result = (result * result) % n
        
        if (bit == "1") {
            result = (result * m) % n
        }
    }
    return result
}