import numberInString from "./math/numberInString";
import largeNumberModPow from "./math/largeNumberPow";

export default async function decrypt(toDecrypt: bigint, key: bigint, n: bigint,): Promise<string> {
    const decrypted = largeNumberModPow(toDecrypt, key, n)
   return numberInString(decrypted)
}