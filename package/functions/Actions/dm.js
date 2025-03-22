export default {
    async execute(utils) {
        let [msg, ID] = utils.inside.split(';');

        if (!msg || !ID) {
            throw new Error('Invalid Message or User ID');
        }

        try {
            await utils.client.users.send(ID, msg);
            
        } catch (e) {
            throw new Error(`Could not send DM to ${ID}. Error: ${e.message}`);
        }
        return {
            code: ""
        }
    }
}
