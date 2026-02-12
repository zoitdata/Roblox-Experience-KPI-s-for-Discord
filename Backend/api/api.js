const express = require("express")
const state = require("./state")
const discord = require("./discord")
const auth = require("./auth")

const router = express.Router()

//CCU UPDATE

router.post("/ccu", auth, (req, res) => {
  const ccu = req.body.ccu

  if (typeof ccu !== "number") {
    return res.sendStatus(400)
  }

  state.ccu = ccu
  state.daily.ccuSamples.push(ccu)

  if (ccu > state.weekly.peakCCU) {
    state.weekly.peakCCU = ccu
  }

  res.sendStatus(200)
})

//PLAYER JOIN

router.post("/join", auth, (req, res) => {
  state.daily.joins++
  res.sendStatus(200)
})

//PURCHASE 

router.post("/purchase", auth, (req, res) => {
  const { receiptId, amount } = req.body

  if (!receiptId || typeof amount !== "number") {
    return res.sendStatus(400)
  }

  // Prevent duplicate processing
  if (state.processedReceipts.has(receiptId)) {
    return res.sendStatus(200)
  }

  state.processedReceipts.add(receiptId)

  // Daily aggregation
  state.daily.revenue += amount

  // Hourly aggregation (for spike detection)
  state.hourly.revenue += amount

  res.sendStatus(200)
})

// SESSION START

router.post("/session/start", auth, (req, res) => {
  const { playerId, timestamp } = req.body

  if (!playerId || !timestamp) {
    return res.sendStatus(400)
  }

  state.sessions.set(playerId, timestamp)
  res.sendStatus(200)
})

//SESSION END

router.post("/session/end", auth, (req, res) => {
  const { playerId, timestamp } = req.body

  if (!playerId || !timestamp) {
    return res.sendStatus(400)
  }

  const start = state.sessions.get(playerId)

  if (start) {
    const duration = timestamp - start

    state.daily.totalSessionTime += duration
    state.daily.sessionCount++

    state.sessions.delete(playerId)
  }

  res.sendStatus(200)
})

module.exports = router
