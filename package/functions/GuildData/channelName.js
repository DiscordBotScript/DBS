export default {
    async execute(utils) {       
      let c = utils.inside ?  await utils.client.channels.fetch(utils.inside) : utils.source.channel
        if(!c?.id) throw new Error(`Invalid channel provided`)
        return {
          code: c.name
        }
    }
  }