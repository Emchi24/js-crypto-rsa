import {fork} from "node:child_process"
import objectToString from "./convertObjectToString"
import stringToObject from "./convertStringToObject"

const pidusage = require("pidusage")

export default async function measureMemoryAndCpuUsage(functionfilePath: string, args?: any[]) {
    let performanceD: any[] = [] 
    let executedWorkerResult: any
    const child = fork(functionfilePath, args, {
        execArgv: functionfilePath.endsWith('.ts') 
            ? ['-r', 'ts-node/register'] 
            : []
    })
    const pid = child.pid

    child.on("error", (error: string) => {
        console.log(error)
    })

    const converted = args?.map((value) => {
        if (typeof value === "object" && value !== null) {
            console.log(objectToString(value))
            return objectToString(value)
        }
        return value
    })

    if (converted) {
    child.send(converted, (error) => {
        if (error != null) {
            console.log(`error trying to send converted arguments: ${converted}`)
        }
    })
    }

    
    return await new Promise<any>((resolve) => {
        const interval = setInterval(async () => {
            try {

                if (child.killed || !pid) {
                    clearInterval(interval)
                    return
                }

                const performanceData = await pidusage(pid)
                performanceD.push(performanceData)
            } catch (err: any) {

                if (err.code === 'ESRCH') {
                    clearInterval(interval)
                } else {
                    console.error(err)
                }
            }
        }, 500)

        child.on("message", (msg: any) => {
            executedWorkerResult = msg
            child.kill()
    
        })

        child.on("exit", (exitCode) => {
            console.log(`process finished with exitcode: ${exitCode}`)
            resolve({
                "performance": performanceD,
                "executedWorkerResults": stringToObject(executedWorkerResult)
            })
        })
    })
}