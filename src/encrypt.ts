import stringInNumber from "./math/stringInNumber"
import largeNumberModPow from "./math/largeNumberPow"

export default async function encrypt(toEncrypt: string | bigint, key: bigint, n: bigint): Promise<bigint> {
    if (typeof toEncrypt == "string") {
        toEncrypt = stringInNumber(toEncrypt)
    }
    const encrypted = largeNumberModPow(toEncrypt, key, n)
    return encrypted
}