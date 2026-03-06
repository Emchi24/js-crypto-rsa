
export default function objectToString(obj: object) {
    if (Array.isArray(obj)) {
        obj.map((value) => {
            return objectToString(value)
        })
    }
    return JSON.stringify(obj, (_, value) =>
        typeof value === "bigint" ? value.toString() : value
    )
    }
