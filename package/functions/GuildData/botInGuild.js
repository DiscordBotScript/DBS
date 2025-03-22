export default {
    async execute(utils) {
        let g = await utils.client.guilds.fetch(utils.inside).catch(e=> null)
        return {
            code : g ? true : false
        }
    }
}