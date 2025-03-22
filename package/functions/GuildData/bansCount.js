export default {
    async execute(utils) {
            
            let srv = await utils.client.guilds.fetch(utils.inside ? utils.inside : utils.source.guild.id);
            
        
            let bans = await srv.bans.fetch();
            
        
            let banCount = bans.size;
            
            return {
                code: banCount || 0 
            };
        
        }
    }
