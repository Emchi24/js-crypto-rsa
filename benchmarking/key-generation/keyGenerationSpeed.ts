const index = require('../../dist/index.js')

async function testPerformenceSpeed(testUntil: number) {
    let avgDuration: number[] = [] 
    for (let i = 40; i < testUntil; i+=8) {
        let durationSum: number = 0
        for (let k = 0; k < 100; k++) {
            let startTimeStamp = performance.now() // timestamp in milsec
            const [publicKey, privateKey] = await index.generateKeyPair(i)
            let endTimeStamp = performance.now()
            durationSum += endTimeStamp - startTimeStamp
            console.log(durationSum)
        }
        avgDuration.push(durationSum / 100)
    }
}

testPerformenceSpeed(4096)