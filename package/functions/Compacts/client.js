export default {
    async execute(utils) {
  
      if (!utils.inside) throw new Error(`No option provided in $client`)
      utils.client.user['mention'] = utils.client.user.toString()
      utils.client.user['avatarurl'] = utils.client.user.displayAvatarURL({ dynamic: true })
  
      if (!(utils.inside in utils.client.user)) throw new Error(`Invalid parameters in $client[${utils.inside}]. You may use the following:\n ${Object.keys(utils.client.user).join('\n')}`)
  
      return {
        code: utils.client.user[utils.inside]
      }
    }
  }