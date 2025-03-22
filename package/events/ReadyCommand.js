import chalk from 'chalk';
import Discord from 'discord.js';
import interpret from 'Dbot.js/package/main/interpreter.js';

export default {
async execute(utils) {
    utils.client.ReadyCommand.forEach(async (command) => {
        const message = {
            id: Math.floor(Math.random() * 10101003949393),
        };
        const {name, code} = await interpret({ ...utils, message, command, Discord });
        const channel = await utils.client.channels.fetch(name).catch(err => {});

        if (!channel) {
            return console.error(chalk.redBright('ReadyCommand channel is missing or invalid!'));
        }



        if (code) {
            const embeds = utils.client.embeds.get(message.id)||[]
            channel.send({content: code, embeds: embeds});
        }
    });
}
}