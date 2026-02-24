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

async function plotData(dataFilePath, plotYLable, divId) {
    const data = await fetchData(dataFilePath)
    const keySizes = []
    const medians = []
    const avgs = []
    
    data.forEach(keySize => {
        const m =  roundNumber((keySize.median / 1000), 2)
        const a =  roundNumber((keySize.avg / 1000), 2)
        keySizes.push(keySize.keySize)
        medians.push(m)
        avgs.push(a)
    })
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
            text: "Key generation speed benchmark results" 
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
    await plotData("./keygen_speed_test_results.json", "Key Generation Execution Time in seconds (rounded to second decimal place)", "keyGenSpeedTest")
})
