export default {
  async execute(utils) {        


        let [chanId, msgId] = utils.inside.split(';')
        let emojis = utils.inside.split(';').slice(2)

        let chan = await utils.client.channels.fetch(chanId).catch(e=>{})
        if(!chan?.id) throw new Error(`Invalid ChannelID provided`)
        let msg = await chan.messages.fetch(msgId).catch(e=>{})
        if(!msg?.id) throw new Error(`Invalid MessageID provided`)

            emojis = emojis.filter(emoji=>emoji)
            emojis.forEach(async emoji => {
                await msg.react(emoji).catch(e=>{utils.source.channel.send(`Failed to react with ${emoji}`)})
            })

        return {
            code: ""
        }
    }
}