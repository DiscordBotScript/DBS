export default {
    async execute(utils) {
        if (!utils.inside) {
            throw new Error("No option provided (yes or mp)");
        }

        if (utils.inside.includes('no')) {
            await utils.source.channel.send(`This command is disabled!`);
            
            
            return { exit: "stop" };
        }
        else if (utils.inside.includes('yes')) {
        return { code: "" }; 
        }
    }
}