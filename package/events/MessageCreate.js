import Discord from 'discord.js';
import interpret from 'Dbot.js/package/main/interpreter.js';

export default {
  async execute(utils) {
    const prefixUsed = utils.prefix.find((p) => utils.message.content.startsWith(p));
    if (!prefixUsed) return;
    let messageArray = utils.message.content.split(" ");
    let cmd = messageArray[0].slice(prefixUsed.length).trim();
    let args = messageArray.slice(1);
    let cmmd = utils.client.commands.get(cmd.toLowerCase()) || utils.client.commands.find(x => x.aliases && x.aliases.includes(cmd.toLowerCase()));

    if (cmmd) {
        for (const code of cmmd.code) {
            const command = {
                name: cmmd.name,
                aliases: cmmd.aliases,
                type: cmmd.type,
                usage: cmmd.usage,
                description: cmmd.description,
                code: code
            };
            const {code:response} = await interpret({ ...utils, command, Discord });
                        const embeds = utils.client.embeds.get(utils.message.id)||[];
                        const files = utils.client.attachments.get(utils.message.id)||[];
                    utils
                    utils.message.channel.send({ content: response, embeds: embeds, files: files }).catch(e => {});
            }
        }
        utils.client.embeds.delete(utils.message.id);
    }
}