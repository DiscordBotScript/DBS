export default {
    async execute(utils) {

    let c = await utils.client.channels.fetch(utils.inside).catch(e=>e)
        return {
            code: c?.id ? true : false
        };
    },
};
