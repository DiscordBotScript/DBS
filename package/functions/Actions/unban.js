export default {
    async execute(utils) {
        let [id, basis] = utils.inside.split(';')
         let user = await utils.client.users.fetch(id).catch(e=>{}) || await utils.client.users.cache.find(user => user.username?.toString()?.toLowerCase() === id?.toLowerCase()) || await utils.client.users.cache.find(user => user.globalName?.toString()?.toLowerCase() === id?.toLowerCase()) || 'undefined'
         if(!user || !user?.id) throw new Error(`Invalid user provided`)

         await utils.source.guild.members.unban(id, { reason: basis ?? 'No Reason Provided.' })
        return {
            code: ""
        }
    }
}