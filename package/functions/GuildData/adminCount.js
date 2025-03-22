export default {
    async execute(utils) {
        let [gid, opt = `all`] = utils.inside.split(';')
        let guild = utils.client.guilds.fetch(gid ? gid : utils.source.guild?.id)
        let check;
        let result;
        let members = await guild.members.fetch()

        if(!guild) throw new Error(`Missing guild`)
        if(!["bot", "human", "all"].includes(opt.toLowerCase())) throw new Error(`Invalid option`)
    
            if (opt!=='all') {
                check = members.filter(member => (opt === "bot") ? member.user.bot : !member.user.bot)
                result = await check.filter(member => member.permissions.has(utils.Discord.PermissionsBitField.Flags.Administrator)).size
            } else {
                result = members.cache.filter(member => member.permissions.has(utils.Discord.PermissionsBitField.Flags.Administrator)).size
            }
               
            return {
                    code: result
                }
        }
    }
