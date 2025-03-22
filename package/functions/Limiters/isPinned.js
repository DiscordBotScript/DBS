export default {
    async execute(utils) {
        let [channelid = utils.source.channelId, msg = utils.source.id] = utils.inside.split(';')

        let channel = await utils.client.channels.fetch(channelid).catch(e => e)
        if (!channel?.id) throw new Error(`Invalid channelID provided`)
        let message = await channel.messages.fetch(msg).catch(e => e)
        if (!message?.id) throw new Error(`Invalid messageID provided`)
        return { code: message.pinned }
    }
}