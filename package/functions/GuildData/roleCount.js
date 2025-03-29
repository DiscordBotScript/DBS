export default {
    async execute(utils) {
        let guild = await utils.client.guilds.fetch(utils.inside ? utils.inside : utils.source.guild?.id);
        let roles = await guild.roles.fetch();
        
        return {
            code: roles.size
        };
    }
}
