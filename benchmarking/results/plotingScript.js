async function fetchData(dataFilePath) {
    try {
        const resp = await fetch(dataFilePath)

        if (!resp.ok) {
            console.log(`fetching the file: ${dataFilePath} responded with statuscode ${resp.status}`)
        }
        const data = await resp.json()
        return data
    }
    catch(error) {console.log(error)}
}

function roundNumber(num, maxFractionDigits) {
    try {
        const numStr = num.toString()
        const split = numStr.split(".")

        const beforeDecimal = split[0]
        const afterDecimal = split[1]
        let x = Number(afterDecimal[maxFractionDigits-1])
        const y = Number(afterDecimal[maxFractionDigits])
        if (y > 4) {
            x++
        }

        const newNum = beforeDecimal + "." + afterDecimal.slice(0, maxFractionDigits-1) + x.toString()
        return Number(newNum)
    } catch(error) {console.log(error)}
}

function prepData(devideBy, data) {
    const keySizes = []
    const medians = []
    const avgs = []

    data.forEach(keySize => {
        const m =  roundNumber((keySize.median / devideBy), 2)
        const a =  roundNumber((keySize.avg / devideBy), 2)
        console.log(m)
        keySizes.push(keySize.keySize)
        medians.push(m)
        avgs.push(a)
    })
    
    return {
        "keySizes": keySizes,
        "medians": medians,
        "avgs": avgs
    }
}

async function plotData(testType, plotName, dataFilePath, plotYLable, divId) {
    const data = await fetchData(dataFilePath)
    let keySizes, medians, avgs
    
    if (testType ==  "keyGenSpeedTest") {
        const t = prepData(1000, data)
        console.log(t)
        keySizes = t.keySizes
        medians = t.medians
        avgs = t.avgs
    }

    if (testType == "memoryTest") {
        const t = prepData(1024*1024, data)
        console.log(t)
        keySizes = t.keySizes
        medians = t.medians
        avgs = t.avgs
    }

    if (testType == "encryptionAndDecryptionSpeedTest") {
        const t = prepData(1, data)
        console.log(t)
        keySizes = t.keySizes
        medians = t.medians
        avgs = t.avgs
    }
    console.log(keySizes, medians, avgs)
    const MedianDataTrace = {
        x: keySizes,
        y: medians,
        type: "scatter",
        name: "Median",
        mode: 'lines+markers',              
        line: {color: 'blue'}        
    }

    const AvgDataTrace = {
        x: keySizes,
        y: avgs,
        type: "scatter",
        name: "Avg",
        mode: 'lines+markers',              
        line: {color: 'orange'}        
    }
    const Traces = [MedianDataTrace, AvgDataTrace]

    const layout = {
        title: { 
            text: plotName 
        },
        xaxis: { 
            title: { text: "Key Size in Bit" },
            automargin: true
        },
        yaxis: { 
            title: { text: plotYLable },
            automargin: true 
        },
        margin: { l: 100, r: 50, b: 80, t: 80 } 
    };

     Plotly.newPlot(divId, Traces, layout)
}

document.addEventListener("DOMContentLoaded", async () => {
    await plotData("keyGenSpeedTest", "Key Generation Speed Test", "./keygen_speed_test.json", "Key Generation Execution Time in seconds (rounded to second decimal place)", "keyGenSpeedTest")
    await plotData("memoryTest", "Key Generation Memory Test", "./keygen_memory_test.json", "Key Generation memory usage in mb (rounded to second decimal place)", "keyGenMemoryTest")
    await plotData("encryptionAndDecryptionSpeedTest", "Encryption Speed Test", "./encryption_speed_test.json", "Encryption Execution Time in milliseconds (rounded to second decimal place)", "encryptionSpeedTest")
    await plotData("memoryTest", "Encryption Memory Test", "./encryption_memory_test.json", "Encryption memory usage in mb (rounded to second decimal place)", "encryptionMemoryTest")

    await plotData("encryptionAndDecryptionSpeedTest", "Decyption Speed Test", "./decryption_speed_test.json", "Decryption Execution Time in milliseconds (rounded to second decimal place)", "decryptionSpeedTest")
    await plotData("memoryTest", "Decryption Memory Test", "./decryption_memory_test.json", "Decryption memory usage in mb (rounded to second decimal place)", "decryptionMemoryTest")
    console.log("finished")
})
