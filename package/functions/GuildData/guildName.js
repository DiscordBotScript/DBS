export default {
  async execute(utils) {        
      let guild = await utils.client.guilds.fetch(utils.inside || utils.source.guild.id).catch(e=>{})
      if(!guild?.id) throw new Error(`Invalid guildId provided`)
      return {
        code: guild.name
      }
    }
  }
  