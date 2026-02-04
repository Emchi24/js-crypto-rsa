
export default async function measureMemoryUsage(toMeasure: Function): Promise<number | null> {
    // try clear memory with gc
    if (global.gc) {
        global.gc()
    }

    // Memory Snapshot before function execution
    const before = process.memoryUsage().heapUsed

    // execute function
    await toMeasure()

    // Snapshot after function execution
    const after = process.memoryUsage().heapUsed
    
    const diff = after - before

    // handle negative results
    if (diff < 0) {
        return null // ignore them later 
    }

    return diff
}