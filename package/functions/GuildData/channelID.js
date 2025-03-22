export default {
  async execute(utils) {       
    let chan = utils.inside ? 
    (utils.guild ? 
      utils.source.guild.channels.cache.find(c=> c.name.toLowerCase() === utils.inside.toLowerCase())
      : utils.client.channels.cache.find(c=> c.name.toLowerCase() === utils.inside.toLowerCase())
    ) : utils.source.channel
      if(!chan?.id) throw new Error(`Invalid channel provided`)
      return {
        code: chan.id
      }
  }
}