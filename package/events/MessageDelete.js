import Discord from 'discord.js';
import interpret from 'Dbot.js/package/main/interpreter.js';

export default {
  async execute(utils) {
        utils.client.MsgDeleteCommand.map(async command => {
    
             let guild = utils.message.guild
    
            const {name, code} = await interpret({...utils, command, guild, Discord})
    
            let channel = await utils.client.channels.fetch(name).catch(err => { })
    
            if (!channel) throw new Error(`Missing or incorrect channel: bot.MessageDeleteCommand(${name})`)
    
            //message.idd = message.id
            //client.embeds.set(message.idd, new Discord.MessageEmbed())
        

            if (typeof code === 'string' && code) {
                const embeds = utils.client.embeds.get(utils.message.id)||[];
                    channel.send({ content: code, embeds: embeds }).catch(e => {});
            }
        })
        utils.client.embeds.delete(utils.message.id);

    }
}
