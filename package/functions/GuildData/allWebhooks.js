export default {
    async execute(utils) {
         let guild = utils.inside ? utils.client.guilds.fetch(utils.inside) : utils.source.guild
        if(!guild?.id) throw new Error(`Invalid guild provided`)
        let res = await guild.fetchWebhooks()

        return {
            code: res.size
        }
    }
}