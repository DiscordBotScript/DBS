export default {
  async execute(utils) {        

        if(!utils.inside) throw new Error(`No emoji(s) provided`)

            let emojis = utils.inside.split(';')

        emojis.forEach(async e=>{
            await utils[source.message||source].react(e).catch(e=>e)
            })


            return {
                code: ""
            }
    }


}
