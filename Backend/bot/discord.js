const { Client, GatewayIntentBits } = require("discord.js")

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
})

client.login(process.env.DISCORD_BOT_TOKEN)

client.once("ready", () => {
  console.log("Discord bot connected")
})

async function send(channelId, content, files = []) {
  try {
    const channel = await client.channels.fetch(channelId)
    if (!channel) return

    await channel.send({ content, files })
  } catch (err) {
    console.error("Discord send error:", err)
  }
}

module.exports = { send }
