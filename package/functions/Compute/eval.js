export default {
    async execute(utils) {
        const module = await import('Dbot.js/package/main/interpreter.js');
        const interpret = module.default;

        if (!utils.inside && !utils.client.embeds.get(utils.source.id) && !utils.client.attachments.get(utils.source.id)) {
            throw new Error('Missing code to evaluate');
        }
        const {code:res} = await interpret({
            ...utils,
            command: {
                name: utils.command.name,
                code: utils.inside.split('a2008E').join('[').split('a2008A').join(']'),
            },
            inside: null,
        });

        return {
            code: res === undefined ? "" : res,
        };
    },
};
