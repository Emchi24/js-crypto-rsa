
export default function stringToObject(str: string) {
    return JSON.parse(str, (_, value) => {
        try {
            return BigInt(value)
        }
        catch (error) {
            return value
        }
    })
}