export default {
    async execute(utils) {
        let [msg, ch] = utils.inside.split(";");
        if (!ch) ch = utils.source.channelId
        if (!msg) throw new Error(`No message provided`)
        let chan = await utils.client.channels.fetch(ch).catch(e => e)
        if (!chan?.id) throw new Error(`Invalid channelID provided`)
        chan.send(msg)
        return { code: ""}
    }
}