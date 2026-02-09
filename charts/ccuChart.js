const QuickChart = require("quickchart-js")
const fs = require("fs")
const t = require("./theme")

module.exports = async rows => {
  const qc = new QuickChart()
  qc.setConfig({
    type: "line",
    data: {
      labels: rows.map(r => r.date).reverse(),
      datasets: [
        { label: "Avg CCU", data: rows.map(r => r.avg_ccu).reverse(), borderColor: t.ccuAvg },
        { label: "Peak CCU", data: rows.map(r => r.peak_ccu).reverse(), borderColor: t.ccuPeak }
      ]
    }
  })
  const img = await qc.toBinary()
  fs.writeFileSync("ccu.png", img)
  return "ccu.png"
}
