export default {
    async execute(utils) {
        let channels = utils.inside.split(";"); 
        let sourceChannel = utils.source.channel;

    
        if (!channels.length || !utils.inside.trim()) {
            throw new Error("No channel provided");
        }

    
        if (!channels.includes(sourceChannel.id)) {
            await utils.source.channel.send(`This command cannot be used in this channel!`);
            
            
            return { exit: "stop" };
        }

        return { code: "" }; 
    }
};
