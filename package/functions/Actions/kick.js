export default {
    async execute(utils) {
        let [id, basis] = utils.inside.split(';')
         let user = await utils.client.users.fetch(id).catch(e=>{}) || await utils.client.users.cache.find(user => user.username?.toString()?.toLowerCase() === id?.toLowerCase()) || await utils.client.users.cache.find(user => user.globalName?.toString()?.toLowerCase() === id?.toLowerCase()) || 'undefined'
         if(!user || !user?.id) throw new Error(`:x: unable to get user in \`$ban[${utils.inside}]\`.`)

        await utils.source.guild.members.kick(id, basis ?? 'No Reason Provided.') 
        return {
            code: ""
        }
    }
}