// @02zoit | 12.02.2026

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
        { label: "Session Length (min)", data: rows.map(r => r.avg_session_length).reverse(), borderColor: t.session }
      ]
    }
  })
  const img = await qc.toBinary()
  fs.writeFileSync("session.png", img)
  return "session.png"
}
