export default {
    async execute(utils) {        
       if (!utils.inside) throw new Error(`Invalid text provided`)
    
       let msg = await utils.source.reply(utils.inside)
    
        if(!msg?.id) throw new Error(`Failed to reply to message`)

        return {
        code: ""
    }
    }
  }