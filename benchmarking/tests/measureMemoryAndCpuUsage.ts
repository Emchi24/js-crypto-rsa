import {fork} from "node:child_process"

const pidusage = require("pidusage")

export default async function measureMemoryAndCpuUsage(functionfilePath: string, args?: any[]) {
    let performanceD: any[] = [] 
    const child = fork(functionfilePath, args, {
        execArgv: functionfilePath.endsWith('.ts') 
            ? ['-r', 'ts-node/register'] 
            : []
    })
    const pid = child.pid

    child.on("error", (error: string) => {
        console.log(error)
    })
    
    return await new Promise((resolve) => {
        const interval = setInterval(async () => {
try {

                if (child.killed || !pid) {
                    clearInterval(interval)
                    return;
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

        child.on("exit", (exitCode) => {
            console.log(`process finished with exitcode: ${exitCode}`)
            interval.close()
            resolve(performanceD)
        })
    })
}