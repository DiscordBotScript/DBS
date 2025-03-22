export default {
    async execute(utils) {
        return {
            code : utils.client.guilds.cache.size
        }
    }
}