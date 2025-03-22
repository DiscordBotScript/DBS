export default {
    async execute(utils) {
        let srv = utils.client.guilds.fetch(utils.inside ? utils.inside : utils.source.guild.id)
        if(!srv?.id) throw new Error(`Invalid ID provided in $botLeave[${utils.inside}]`)
        await srv.leave()
        return {
            code: `Left ${srv.name}`
        }
    } 
}        