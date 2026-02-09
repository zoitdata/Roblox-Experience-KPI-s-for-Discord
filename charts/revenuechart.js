const QuickChart = require("quickchart-js")
const fs = require("fs")
const t = require("./theme")

module.exports = async rows => {
  const qc = new QuickChart()
  qc.setConfig({
    type: "bar",
    data: {
      labels: rows.map(r => r.date).reverse(),
      datasets: [
        { label: "Revenue", data: rows.map(r => r.total_revenue).reverse(), backgroundColor: t.revenue }
      ]
    }
  })
  const img = await qc.toBinary()
  fs.writeFileSync("revenue.png", img)
  return "revenue.png"
}