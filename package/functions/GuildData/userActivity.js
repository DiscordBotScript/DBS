export default {
    async execute(utils) {
        let intents = utils.client.options.intents.toArray();
        if(!intents?.includes('GuildPresences')) throw new Error(`Missing required \`GuildPresences\` intent`);
        let usr = await utils.source.guild.members.fetch(utils.inside ? utils.inside : utils.source.member).catch(e=>e) //activities is not a 'user/author' attribute. only guild member
        if(!usr?.id) throw new Error(`Invalid User ID provided`)
        return {
        code: usr.presence.activities
    }
    }
}