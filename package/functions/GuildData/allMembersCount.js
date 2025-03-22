export default {
  async execute(utils) {        
        let users = 0
        utils.client.guilds.cache.map(guild => users += guild.memberCount) 
    return {
        code: users
    }        
    }
  }
  