export default {
    async execute(utils) {
        if (utils.isInteraction) {
            if (!utils.inside) throw new Error('Missing args required for interactions')
            const optionName = utils.inside?.trim();
            const optionValue = utils.source.options.get(optionName)
/*
            if (!optionValue) {
                if (utils.inside.includes(";")) {
                    const [messageId, property] = utils.inside.split(";");

                    try {
                        const message = await utils.source.channel.messages.fetch(messageId.trim());

                        if (!message) {
                            throw new Error(`Message with ID ${messageId.trim()} not found.`);
                        }

                        switch (property.trim().toLowerCase()) {
                            case 'authorid':
                                return { code: message.author.id };
                            case 'content':
                                return { code: message.content };
                            case 'createdat':
                                return { code: message.createdAt.toISOString() };
                            default:
                                throw new Error(`Unknown property ${property} for message.`);
                        }
                    } catch (error) {
                        throw new Error(`Could not fetch message: ${error.message}`);
                    }
                } else {
                    throw new Error(`Option ${optionName} not found in this interaction.`);
                }
            }
*/
            return {
                code: (optionValue?.value ?? optionValue ?? null).trim()
                .split('[').join('a2008E').split(']').join('a2008A').split(';').join('#COLON#').split(/ +/g)
            };
        }

        let cmd;
        const prefixUsed = utils.client.prefix.find((p) => utils.source.content.startsWith(p));
        if (prefixUsed) {
            cmd = utils.client.commands.get(utils.source.content.split(" ")[0].slice(prefixUsed.length).trim()) ||
                  utils.client.commands.find(x => x.aliases && x.aliases.includes(utils.message.content.split(" ")[0].slice(prefixUsed.length).trim()));
        }

        let args = cmd ? utils.source.content.slice(utils.client.prefix.length).trim()
            .split('[').join('a2008E').split(']').join('a2008A').split(';').join('#COLON#').split(/ +/g) : 
            utils.source.content.trim().split('[').join('a2008E').split(']').join('a2008A').split(';').join('#COLON#').split(/ +/g);
        if (!utils.inside) {
            return {
                code: args.join(" ")
            };
        }

        if (utils.inside.includes(";")) {
            const [messageId, property] = utils.inside.split(";");

            try {
                const message = await utils.source.channel.messages.fetch(messageId.trim());

                if (!message) {
                    throw new Error(`Message with ID ${messageId.trim()} not found.`);
                }

                switch (property.trim().toLowerCase()) {
                    case 'authorid':
                        return { code: message.author.id };
                    case 'content':
                        return { code: message.content };
                    case 'createdat':
                        return { code: message.createdAt.toISOString() };
                    default:
                        throw new Error(`Unknown property ${property} for message.`);
                }
            } catch (error) {
                throw new Error(`Could not fetch message: ${error.message}`);
            }
        }

        if (utils.inside.includes(">")) {
            const [index, ...rest] = utils.inside.split(">");

            if (isNaN(index) || Number(index) < 0) {
                throw new Error(`Invalid number provided`);
            }
            const startIndex = Number(index);
            return {
                code: args.slice(startIndex).join(" ")
            };
        } else {
            if (isNaN(utils.inside) || Number(utils.inside) < 0) {
                console.log(utils.inside)
                throw new Error(`Invalid number provided`);
            }
            return {
                code: args[Number(utils.inside)] || undefined
            };
        }
    }
};
