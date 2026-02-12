// @02zoit | 12.02.2026

module.exports = {
  ccu: 0,

  processedReceipts: new Set(),
  sessions: new Map(),

  daily: {
    joins: 0,
    revenue: 0,
    totalSessionTime: 0,
    sessionCount: 0,
    ccuSamples: []
  },

  weekly: {
    peakCCU: 0
  },

  hourly: {
    revenue: 0,
    currentHour: null
  }
}
