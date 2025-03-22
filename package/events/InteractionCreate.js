import Discord from 'discord.js';
import interpret from 'Dbot.js/package/main/interpreter.js';

export default {
  async execute(utils) {

    let command = {}
    if (utils.interaction.isCommand()) {
      let cmmd = utils.client.applicationcommands.get(utils.interaction.commandName)

      if (cmmd) command = {
        name: cmmd.name,
        code: cmmd.code,
        location: cmmd.location
      };
    }

    const {code: response} = await interpret({ ...utils, command, Discord });
    const embeds = utils.client.embeds.get(utils.interaction.id) || [];
    const files = utils.client.attachments.get(utils.interaction.id) || [];
    try {
    await utils.interaction.reply({
      content: response || null,
      embeds: embeds,
      files: files,
      ephemeral: utils.client.isInteractionEphemeral || false
    }).catch(async (error) => {
      await utils.interaction.editReply({
        content: response || null,
        embeds: embeds,
        files: files,
        ephemeral: utils.client.isInteractionEphemeral || false
      })
    });
    utils.client.embeds.delete(utils.interaction.id);
  } catch (e) {
    throw new Error(e.message)
  }
  }
}