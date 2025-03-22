export default {
    async execute(utils) {
        let guilds = utils.inside.split(";"); 
        let sourceGuild = utils.source.guild

    
        if (!guilds.length || !utils.inside.trim()) {
            throw new Error("No channel provided");
        }

    
        if (!guilds.includes(sourceGuild.id)) {
            await utils.source.channel.send(`This command cannot be used in this guild!`);
            
            
            return { exit: "stop" };
        }

        return { code: "" }; 
    }
};
