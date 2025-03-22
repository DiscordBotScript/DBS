export default {
  async execute(utils) {        
      if (!utils.inside) throw new Error(`No option provided`)
        
    let [userid = utils.source.author.id, opt] = utils.inside.split(';')
    let user = await utils.client.users.fetch(userid).catch(e=>e)

    if(!user?.id) throw new Error(`Invalid userID provided`)

      user['avatardecoration'] = user.avatarDecorationURL({dyanmic:true})
      user['bannerurl'] = user.bannerURL({dyanmic:true})
      user['displayavatarurl'] = user.displayAvatarURL({dynamic:true})
      user['mention'] = user.toString()
      if (!(opt in user)) throw new Error(`Invalid parameters in $user[${opt}]. You may use the following:\n ${Object.keys(user).join('\n')}`)
      if (opt in user) {
              if(typeof user[opt] !== 'function') 
                return { code: user[opt]}
      }
    }
  }
  