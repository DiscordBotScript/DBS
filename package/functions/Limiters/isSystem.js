export default {
    async execute(utils) {
if (!utils.inside) throw new Error(`No option provided`)
        
    let userid = utils.inside || utils.source.author.id
    let user = await utils.client.users.fetch(userid).catch(e=>e)

    if(!user?.id) throw new Error(`Invalid userID provided`)
        
            return {
                code : user.system
            }
        }
    }